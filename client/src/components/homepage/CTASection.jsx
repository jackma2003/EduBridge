import React from 'react';

const CTASection = ({ handleGetStarted, handleExploreFeatures }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of learners worldwide who are transforming their education
            with EduBridge's personalized learning platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              className="px-6 py-2 bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-lg"
              onClick={handleGetStarted}
            >
              Create Free Account
            </button>
            <button 
              className="px-6 py-2 border border-white text-white hover:bg-white hover:bg-opacity-10 rounded-lg"
              onClick={handleExploreFeatures}
            >
              Explore Features
            </button>
          </div>
          <p className="mt-6 text-sm text-blue-200">
            No credit card required. Start learning today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;