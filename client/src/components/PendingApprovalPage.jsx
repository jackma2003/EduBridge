import React from 'react';
import { Link } from 'react-router-dom';

const PendingApprovalPage = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for applying to become an EduBridge teacher. Your application is now being reviewed by our team.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-8 text-left">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">What happens next?</h2>
            <ul className="list-disc list-inside text-blue-800 space-y-2">
              <li>Our team will review your application within 1-2 business days</li>
              <li>You'll receive an email notification with the decision</li>
              <li>If approved, you'll be able to create and publish courses</li>
              <li>If we need additional information, we'll contact you by email</li>
            </ul>
          </div>
          
          <p className="text-gray-600 mb-8">
            While you wait, you can explore existing courses on the platform or prepare course materials.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Return to Home
            </Link>
            <Link 
              to="/courses"
              className="px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
            >
              Explore Courses
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Have questions? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PendingApprovalPage;