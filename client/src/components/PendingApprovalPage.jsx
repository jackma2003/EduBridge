import React from 'react';
import { Link } from 'react-router-dom';

const PendingApprovalPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 backdrop-filter backdrop-blur-lg bg-opacity-95">
          <div className="text-center">
            {/* Status Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            
            <p className="text-gray-600 text-lg mb-8">
              Thank you for applying to become an EduBridge teacher. Your application has been received and is now being reviewed by our team.
            </p>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-between max-w-md mx-auto my-10">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs mt-2 text-gray-600">Submitted</span>
              </div>
              <div className="h-1 flex-1 mx-2 bg-indigo-200">
                <div className="h-1 w-0 bg-indigo-600"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xs mt-2 text-gray-600">In Review</span>
              </div>
              <div className="h-1 flex-1 mx-2 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs mt-2 text-gray-600">Approved</span>
              </div>
            </div>
            
            {/* Next Steps Card */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl mb-8 text-left border-l-4 border-indigo-500">
              <h2 className="text-lg font-semibold text-indigo-800 mb-4">What happens next?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-200 text-indigo-600 flex items-center justify-center mt-0.5 mr-3">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <p className="text-indigo-800">Our team will review your application within 1-2 business days</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-200 text-indigo-600 flex items-center justify-center mt-0.5 mr-3">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <p className="text-indigo-800">You'll receive an email notification with the decision</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-200 text-indigo-600 flex items-center justify-center mt-0.5 mr-3">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <p className="text-indigo-800">If approved, you'll be able to create and publish courses</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-200 text-indigo-600 flex items-center justify-center mt-0.5 mr-3">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <p className="text-indigo-800">If we need additional information, we'll contact you by email</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-8">
              While you wait, you can explore existing courses on the platform or prepare course materials.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
              <Link 
                to="/"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return to Home
              </Link>
              <Link 
                to="/courses"
                className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200 ease-in-out flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
        
        {/* Support Card */}
        <div className="bg-white shadow-md rounded-xl p-5 text-center flex items-center justify-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600">
            Have questions? <a href="/contact" className="text-indigo-600 hover:text-indigo-800 font-medium">Contact our support team</a>
          </p>
        </div>
        
        {/* Email Reminder */}
        <div className="text-center text-sm text-gray-500">
          <p>Don't forget to check your email for updates regarding your application status.</p>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalPage;