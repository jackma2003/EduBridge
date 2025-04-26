import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, enrollCourse, rateCourse, unenrollCourse } from '../services/api';

// Import components
import Navigation from './coursepage/Navigation';
import CourseHeader from './coursepage/CourseHeader';
import EnrollmentButton from './coursepage/EnrollmentButton';
import CourseContent from './coursepage/CourseContent';
import CourseInfo from './coursepage/CourseInfo';
import RatingForm from './coursepage/RatingForm';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [unenrolling, setUnenrolling] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);
  const [ratingError, setRatingError] = useState('');
  const [showRatingForm, setShowRatingForm] = useState(false);

  // Format date helper function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setUserRole(null);
    navigate('/');
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUserRole(userData.role);
      setUserId(userData.id);
      setUser(userData);
    }

    // Fetch course details
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await getCourse(id);
        setCourse(response.data.course);
        
        // Check if user is enrolled
        if (isLoggedIn) {
          const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
          const enrolled = response.data.course.enrolledStudents.some(
            enrollment => enrollment.student?._id === userId || enrollment.student === userId
          );
          setIsEnrolled(enrolled);
          
          // Check if user has already rated
          const userRatingObj = response.data.course.ratings.find(
            rating => rating.student?._id === userId || rating.student === userId
          );
          
          if (userRatingObj) {
            setUserRating(userRatingObj.rating);
            setUserReview(userRatingObj.review || '');
          }
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, isLoggedIn]);

  // Handle course enrollment
  const handleEnroll = async () => {
    try {
      if (!isLoggedIn) {
        // Redirect to login page if not logged in
        navigate('/login', { state: { redirectTo: `/courses/${id}` } });
        return;
      }

      setEnrolling(true);
      await enrollCourse(id);
      setIsEnrolled(true);
      
      // Refresh course data
      const response = await getCourse(id);
      setCourse(response.data.course);
    } catch (err) {
      console.error('Error enrolling in course:', err);
      if (err.response && err.response.status === 400 && err.response.data.message === 'Already enrolled in this course') {
        setIsEnrolled(true);
      } else {
        setError('Failed to enroll in the course. Please try again.');
      }
    } finally {
      setEnrolling(false);
    }
  };

  // Handle course unenrollment
  const handleUnenroll = async () => {
    try {
      if (!isLoggedIn) {
        navigate('/login');
        return;
      }
  
      setUnenrolling(true);
      
      // Use the unenrollCourse API function
      await unenrollCourse(id);
      
      setIsEnrolled(false);
      // Redirect to dashboard to see updated enrolled courses
      navigate('/dashboard');
        
    } catch (err) {
      console.error('Error unenrolling from course:', err);
      setError('Failed to unenroll from the course. Please try again.');
    } finally {
      setUnenrolling(false);
    }
  };

// Handle rating submission
const handleRatingSubmit = async (e) => {
  e.preventDefault();
  
  if (userRating === 0) {
    setRatingError('Please select a rating.');
    return;
  }
  
  try {
    setSubmittingRating(true);
    setRatingError('');
    
    // Send the rating to the server
    await rateCourse(id, {
      rating: userRating,
      review: userReview
    });
    
    // Refresh the course data to get updated ratings
    const courseResponse = await getCourse(id);
    setCourse(courseResponse.data.course);
    
    // Update local user rating values to match what was submitted
    // (This helps maintain consistency if they edit again before refresh)
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const userRatingObj = courseResponse.data.course.ratings.find(
      rating => rating.student?._id === userId || rating.student === userId
    );
    
    if (userRatingObj) {
      setUserRating(userRatingObj.rating);
      setUserReview(userRatingObj.review || '');
    }
    
    // Hide the rating form
    setShowRatingForm(false);
  } catch (err) {
    console.error('Error submitting rating:', err);
    setRatingError('Failed to submit rating. Please try again.');
  } finally {
    setSubmittingRating(false);
  }
};

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="h-6 w-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Error
          </div>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <p className="text-gray-700">Course not found.</p>
          <button
            onClick={() => navigate('/courses')} 
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation 
        isLoggedIn={isLoggedIn} 
        userRole={userRole} 
        user={user} 
        handleLogout={handleLogout} 
        courseId={id} // Pass the course ID from the URL params
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="flex items-end justify-end">
          <div className="ml-auto mb-4">
            <EnrollmentButton 
              isEnrolled={isEnrolled}
              enrolling={enrolling}
              handleEnroll={handleEnroll}
              handleUnenroll={handleUnenroll}
              courseId={course._id}
              isTeacher={userRole === 'teacher'}
              isCurrentTeacher={userRole === 'teacher' && course.instructor?._id === userId}
            />
          </div>
        </div>
        
        <CourseHeader course={course} />

        {/* Rating Form */}
        {isEnrolled && showRatingForm && (
          <RatingForm 
            userRating={userRating}
            setUserRating={setUserRating}
            userReview={userReview}
            setUserReview={setUserReview}
            handleRatingSubmit={handleRatingSubmit}
            setShowRatingForm={setShowRatingForm}
            submittingRating={submittingRating}
            ratingError={ratingError}
          />
        )}

        {/* Course Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Course info */}
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">About This Course</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600">{course.description}</p>
                </div>
              </div>
            </div>
            
            {/* Course Modules */}
            <CourseContent course={course} />
          </div>
          
          {/* Right column - Sidebar */}
          <div className="md:col-span-1">
            <CourseInfo 
              course={course}
              formatDate={formatDate}
              isEnrolled={isEnrolled}
              enrolling={enrolling}
              handleEnroll={handleEnroll}
            />
            
            {/* Rating Button (Desktop) */}
            {isEnrolled && !showRatingForm && (
              <div className="mt-4 hidden sm:block">
                <button
                  onClick={() => setShowRatingForm(true)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {userRating > 0 ? 'Edit Your Rating' : 'Rate This Course'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;