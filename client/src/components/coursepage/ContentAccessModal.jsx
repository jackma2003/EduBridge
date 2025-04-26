import React from 'react';
import { Link } from 'react-router-dom';

const ContentAccessModal = ({ showModal, handleClose, contentTitle, contentType }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-900">Content Access Restricted</h3>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center justify-center mb-5">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V8a3 3 0 00-3-3H9a3 3 0 00-3 3v1m12 0v1a3 3 0 01-3 3h-1m-8 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <div className="mb-5 text-center">
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">{contentTitle || "This content"}</span> is only available to enrolled students.
          </p>
          <p className="text-gray-600 mb-4">
            Please sign in and enroll in this course to access all {contentType || "content"} materials.
          </p>
          <p className="text-sm text-gray-500">
            Already enrolled? Sign in to continue your learning journey.
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

export default ContentAccessModal;