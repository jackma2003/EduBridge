import React from 'react';

const CTASection = ({ handleGetStarted, handleExploreFeatures }) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-95 z-0"></div>
      <div className="absolute inset-0 bg-pattern z-0 opacity-10" 
           style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl border border-white/20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Learning Journey?</h2>
            <p className="text-xl mb-10 text-blue-100">
              Join thousands of learners worldwide who are mastering new skills at their own pace
              with EduBridge's AI-powered learning platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                className="px-8 py-3 bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-full shadow-lg transition-all hover:shadow-xl hover:shadow-blue-900/20"
                onClick={handleGetStarted}
              >
                <span className="flex items-center justify-center">
                  <span>Create Free Account</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              <button 
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-700 rounded-full transition-all"
                onClick={handleExploreFeatures}
              >
                Explore Features
              </button>
            </div>
            <p className="mt-8 text-sm text-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No credit card required. Start learning today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;