import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCourses, enrollCourse, getProfile } from '../services/api';

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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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

  // Generate a background color based on the course title
  const generateBgColor = (title) => {
    const colors = [
      'from-blue-500 to-indigo-700',
      'from-purple-500 to-pink-600',
      'from-green-500 to-teal-600',
      'from-orange-400 to-red-600',
      'from-cyan-500 to-blue-600'
    ];
    
    // Simple hash function to pick a color consistently
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Get instructor initials for avatar
  const getInitials = (name) => {
    if (!name) return "IN";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Render star rating based on course rating
  const renderStarRating = (rating) => {
    const ratingValue = parseFloat(rating) || 0;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i}
          className={`h-4 w-4 ${i <= ratingValue ? 'text-yellow-400' : 'text-gray-300'}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return (
      <div className="flex items-center">
        <div className="flex mr-1">{stars}</div>
        <span>{rating || '0.0'}</span>
      </div>
    );
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/courses" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Courses
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Login
                    </Link>
                    <Link to="/register" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Notice */}
      {showLoginNotice && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Sign in required</h3>
              <button 
                onClick={handleCloseLoginNotice}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-5">
              <p className="text-gray-600 mb-4">
                You need to be logged in to enroll in courses. Please sign in or create an account to continue.
              </p>
              <p className="text-sm text-gray-500">
                You can still browse all courses without signing in.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <Link
                to="/login"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Courses
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover high-quality courses from our expert instructors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search courses</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search courses by title, description, or topic"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div>
                <label htmlFor="level" className="sr-only">Level</label>
                <select
                  id="level"
                  name="level"
                  value={filters.level}
                  onChange={handleFilterChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label htmlFor="topic" className="sr-only">Topic</label>
                <select
                  id="topic"
                  name="topic"
                  value={filters.topic}
                  onChange={handleFilterChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">All Topics</option>
                  {uniqueTopics.map((topic, index) => (
                    <option key={index} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

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
            {filteredCourses.map((course) => {
              const courseEnrolled = isEnrolled(course._id);
              const bgGradient = generateBgColor(course.title);
              const instructorInitials = getInitials(course.instructor?.name);
              
              return (
                <div key={course._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 relative">
                    {/* Gradient background instead of image */}
                    <div className={`w-full h-full bg-gradient-to-br ${bgGradient}`}></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      {/* Initials-based avatar instead of profile picture */}
                      <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium text-xs bg-gray-700 mr-2">
                        {instructorInitials}
                      </div>
                      <p className="text-sm text-gray-500">
                        {course.instructor?.name || 'Unknown Instructor'}
                      </p>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-1 truncate hover:text-blue-600">
                      <Link to={`/courses/${course._id}`}>
                        {course.title}
                      </Link>
                    </h3>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      {renderStarRating(course.averageRating)}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.topics?.slice(0, 3).map((topic, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {topic}
                        </span>
                      ))}
                      {course.topics?.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{course.topics.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {course.description?.substring(0, 150)}...
                    </p>
                    
                    <div className="mt-auto">
                      {courseEnrolled ? (
                        <button
                          onClick={() => navigate(`/courses/${course._id}`)}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Continue Learning
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnroll(course._id)}
                          disabled={enrollingCourseId === course._id}
                          className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                            enrollingCourseId === course._id
                              ? 'bg-blue-400'
                              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                          }`}
                        >
                          {enrollingCourseId === course._id ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Enrolling...
                            </>
                          ) : (
                            'Enroll Now'
                          )}
                        </button>
                      )}
                      
                      <Link
                        to={`/courses/${course._id}`}
                        className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCourses;