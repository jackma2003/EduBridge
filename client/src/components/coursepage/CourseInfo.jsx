import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewsList from './ReviewsList';

const CourseInfo = ({ 
  course, 
  formatDate, 
  isEnrolled, 
  enrolling, 
  handleEnroll 
}) => {
  const navigate = useNavigate();
  
  // Calculate average rating from the ratings array to ensure it's always up-to-date
  const calculateAverageRating = () => {
    if (!course.ratings || course.ratings.length === 0) return 0;
    const totalRating = course.ratings.reduce((sum, item) => sum + item.rating, 0);
    return parseFloat((totalRating / course.ratings.length).toFixed(1));
  };
  
  // Get current average rating
  const averageRating = course.averageRating || calculateAverageRating();
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden sticky top-8">
      <div className="p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Course Information</h2>
        
        {/* Display the course rating */}
        <div className="mb-4">
          <div className="flex items-center">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star}
                  className={`h-5 w-5 ${star <= averageRating ? 'text-yellow-400' : 'text-gray-300'}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {averageRating} ({course.ratings?.length || 0} {course.ratings?.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Languages</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {course.languages?.map((language, index) => {
                const languageName = 
                  language === 'en' ? 'English' : 
                  language === 'es' ? 'Spanish' : 
                  language === 'fr' ? 'French' : language;
                  
                return (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {languageName}
                  </span>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Level</h3>
            <p className="mt-1 text-sm text-gray-900">
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Topics</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {course.topics?.map((topic, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
            <p className="mt-1 text-sm text-gray-900">
              {formatDate(course.updatedAt)}
            </p>
          </div>
          
          {/* Enrollment button for mobile */}
          <div className="md:hidden mt-4">
            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  enrolling ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {enrolling ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enrolling...
                  </>
                ) : 'Enroll in Course'}
              </button>
            ) : (
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Continue Learning
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Student Reviews */}
      {course.ratings?.length > 0 && (
        <ReviewsList ratings={course.ratings} formatDate={formatDate} />
      )}
    </div>
  );
};

export default CourseInfo;