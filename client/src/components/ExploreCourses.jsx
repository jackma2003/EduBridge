import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCourses, enrollCourse, getProfile } from '../services/api';

// Import components
import ExploreCoursesHeader from './explorecoursepage/ExploreCoursesHeader';
import SearchAndFilters from './explorecoursepage/SearchAndFilters';
import CourseCard from './explorecoursepage/CourseCard';
import LoginNoticeModal from './explorecoursepage/LoginNoticeModal';

// Import utility functions
import { generateBgColor, getInitials, renderStarRating } from './explorecoursepage/courseUtils';

const ExploreCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: '',
    topic: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [showLoginNotice, setShowLoginNotice] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all courses
        const response = await getCourses();
        setCourses(response.data.courses);
        setFilteredCourses(response.data.courses);
        
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
          
          // Fetch user profile to get enrolled courses
          try {
            const profileResponse = await getProfile();
            setUser(profileResponse.data.user);
            
            // Extract enrolled course IDs
            let enrolledIds = [];
            
            if (profileResponse.data.user.enrolledCourses) {
              enrolledIds = profileResponse.data.user.enrolledCourses.map(course => 
                typeof course === 'object' ? course._id : course
              );
            }
            
            setEnrolledCourseIds(enrolledIds);
          } catch (profileErr) {
            console.error('Error fetching user profile:', profileErr);
          }
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter courses when search term or filters change
  useEffect(() => {
    let result = courses;

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        course =>
          course.title.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term) ||
          course.topics.some(topic => topic.toLowerCase().includes(term))
      );
    }

    // Apply level filter
    if (filters.level) {
      result = result.filter(course => course.level === filters.level);
    }

    // Apply topic filter
    if (filters.topic) {
      result = result.filter(course =>
        course.topics.some(topic => topic.toLowerCase() === filters.topic.toLowerCase())
      );
    }

    setFilteredCourses(result);
  }, [searchTerm, filters, courses]);

  // Get unique topics from all courses for the filter dropdown
  const uniqueTopics = [...new Set(courses.flatMap(course => course.topics))];

  // Check if student is enrolled in a course
  const isEnrolled = (courseId) => {
    return enrolledCourseIds.includes(courseId);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      level: '',
      topic: ''
    });
  };

  // Handle course enrollment
  const handleEnroll = async (courseId) => {
    try {
      if (!isLoggedIn) {
        // Show login notice instead of immediately redirecting
        setShowLoginNotice(true);
        return;
      }
      
      // If already enrolled, just go to the course page
      if (isEnrolled(courseId)) {
        navigate(`/courses/${courseId}`);
        return;
      }

      setEnrollingCourseId(courseId);
      await enrollCourse(courseId);
      
      // Update enrolled courses list
      setEnrolledCourseIds(prev => [...prev, courseId]);
      
      // After successful enrollment, navigate to the course page
      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error('Error enrolling in course:', err);
      if (err.response && err.response.status === 400 && err.response.data.message === 'Already enrolled in this course') {
        // Update enrolled courses list if the error is because they're already enrolled
        setEnrolledCourseIds(prev => [...prev, courseId]);
        navigate(`/courses/${courseId}`);
      } else {
        setError('Failed to enroll in the course. Please try again.');
      }
    } finally {
      setEnrollingCourseId(null);
    }
  };

  // Close login notice
  const handleCloseLoginNotice = () => {
    setShowLoginNotice(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; // Redirect to home page instead of login page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header component */}
      <ExploreCoursesHeader 
        isLoggedIn={isLoggedIn} 
        user={user} 
        handleLogout={handleLogout} 
      />

      {/* Login Notice Modal */}
      <LoginNoticeModal 
        showLoginNotice={showLoginNotice} 
        handleCloseLoginNotice={handleCloseLoginNotice} 
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Guest browsing notice */}
        {!isLoggedIn && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  You're browsing as a guest. <Link to="/login" className="font-medium underline">Sign in</Link> or <Link to="/register" className="font-medium underline">create an account</Link> to enroll in courses.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Courses
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover high-quality courses from our expert instructors
          </p>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          handleFilterChange={handleFilterChange}
          clearFilters={clearFilters}
          uniqueTopics={uniqueTopics}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course._id}
                course={course}
                isEnrolled={isEnrolled}
                enrollingCourseId={enrollingCourseId}
                handleEnroll={handleEnroll}
                navigate={navigate}
                getInitials={getInitials}
                generateBgColor={generateBgColor}
                renderStarRating={renderStarRating}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCourses;