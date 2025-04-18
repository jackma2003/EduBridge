import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EnrollmentButton = ({ 
  isEnrolled, 
  enrolling, 
  handleEnroll, 
  handleUnenroll, // Add unenroll handler
  courseId, 
  isTeacher,
  isCurrentTeacher
}) => {
  const navigate = useNavigate();
  const [showUnenrollConfirm, setShowUnenrollConfirm] = useState(false);
  const [unenrolling, setUnenrolling] = useState(false);
  
  // Function to handle unenroll with confirmation
  const confirmUnenroll = async () => {
    setUnenrolling(true);
    await handleUnenroll();
    setUnenrolling(false);
    setShowUnenrollConfirm(false);
  };
  
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      {!isEnrolled ? (
        <button
          onClick={handleEnroll}
          disabled={enrolling}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
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
      ) : showUnenrollConfirm ? (
        <div className="flex space-x-2">
          <button
            onClick={confirmUnenroll}
            disabled={unenrolling}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              unenrolling ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            }`}
          >
            {unenrolling ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Confirm Unenroll'}
          </button>
          <button
            onClick={() => setShowUnenrollConfirm(false)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Continue Learning
          </button>
          <button
            onClick={() => setShowUnenrollConfirm(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Unenroll
          </button>
        </div>
      )}
      
      {/* Teacher edit button */}
      {isTeacher && isCurrentTeacher && (
        <Link 
          to={`/courses/edit/${courseId}`}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Course
        </Link>
      )}
    </div>
  );
};

export default EnrollmentButton;