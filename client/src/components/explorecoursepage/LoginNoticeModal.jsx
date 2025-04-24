import React from 'react';
import { Link } from 'react-router-dom';

const LoginNoticeModal = ({ showLoginNotice, handleCloseLoginNotice }) => {
  if (!showLoginNotice) return null;

  return (
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
  );
};

export default LoginNoticeModal;