import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learning Without Boundaries
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              EduBridge provides personalized, flexible, and engaging learning experiences
              for students worldwide. Break down educational barriers with our inclusive platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="btn bg-white text-blue-700 hover:bg-blue-50 font-semibold">
                Get Started
              </button>
              <button className="btn border border-white text-white hover:bg-white hover:bg-opacity-10">
                Explore Courses
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              {/* Placeholder for hero image */}
              <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur-sm border border-white border-opacity-20 shadow-xl">
                <div className="w-full h-64 bg-blue-800 bg-opacity-50 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-6xl">🌉</span>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-blue-800 bg-opacity-50 rounded-full w-3/4"></div>
                  <div className="h-4 bg-blue-800 bg-opacity-50 rounded-full w-full"></div>
                  <div className="h-4 bg-blue-800 bg-opacity-50 rounded-full w-5/6"></div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;