import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ 
  course, 
  isEnrolled, 
  enrollingCourseId, 
  handleEnroll, 
  navigate, 
  getInitials, 
  generateBgColor, 
  renderStarRating,
  isTeacher
}) => {
  const courseEnrolled = isEnrolled(course._id);
  const bgGradient = generateBgColor(course.title);
  const instructorInitials = getInitials(course.instructor?.name);
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
          {/* Display different buttons based on user role and enrollment status */}
          {courseEnrolled ? (
            <button
              onClick={() => navigate(`/courses/${course._id}`)}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue Learning
            </button>
          ) : isTeacher() ? (
            // Teachers cannot enroll - show view details button only
            <Link
              to={`/courses/${course._id}`}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Course Details
            </Link>
          ) : (
            // Students can enroll
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
          
          {/* Show View Details button for non-teachers when not enrolled, or as a secondary option for teachers */}
          {!courseEnrolled && !isTeacher() && (
            <Link
              to={`/courses/${course._id}`}
              className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;