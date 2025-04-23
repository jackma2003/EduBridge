import React from 'react';

const HeroSection = ({ handleGetStarted, handleExploreCourses }) => {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      {/* Abstract shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
              The Future of Online Learning
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Learn Without <br />Boundaries
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover a personalized learning experience that adapts to your needs, 
              goals, and preferred learning style. Access world-class education from anywhere, 
              anytime, on any device.
            </p>
            
            {/* CTA Buttons - Moved up to fill the space left by the search bar */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-10">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center justify-center group"
              >
                <span>Get Started</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={handleExploreCourses}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-all flex items-center justify-center"
              >
                Explore Courses
              </button>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center mr-8">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 font-medium">Secure Learning Environment</span>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 font-medium">Learn at Your Own Pace</span>
              </div>
            </div>
          </div>
          
          {/* Video Content */}
          <div className="lg:w-1/2 relative">
            <div className="relative mx-auto w-full max-w-lg">
              {/* Decorative Background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 transform rotate-6 shadow-2xl"></div>
              
              {/* Video Container */}
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-blue-600 text-white py-4 px-6 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto font-medium">EduBridge Learning Platform</div>
                </div>
                
                <div className="p-2 bg-gray-50">
                  {/* Video Player */}
                  <div className="rounded-lg overflow-hidden shadow-inner">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src="/EduBridge.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
                
                {/* Platform Controls */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Introduction to EduBridge</div>
                        <div className="text-xs text-gray-500">Learn how our platform works</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full shadow-lg"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-green-400 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;