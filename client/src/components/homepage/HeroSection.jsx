import React from "react";

const HeroSection = ({ handleGetStarted, handleExploreCourses }) => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Unlock Your Learning Potential
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Access world-class courses, personalized learning paths, and a
              global community of educators and learners.
            </p>

            {/* Course search bar */}
            <div className="bg-white p-1 rounded-lg flex mb-8 shadow-lg">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="px-6 py-2 bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-lg"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
              <button
                className="px-6 py-2 border border-white text-white hover:bg-white hover:bg-opacity-10 rounded-lg"
                onClick={handleExploreCourses}
              >
                Explore Courses
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 text-blue-100 text-sm flex items-center">
              <span className="mr-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
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
                Secure Learning Environment
              </span>
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
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
                Learn at Your Own Pace
              </span>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="relative">
              {/* Course showcase */}
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm border border-white border-opacity-20 shadow-xl">
                <video
                  className="relative top-0 left-0 w-50 h-50 object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/EduBridge.mp4" type="video/mp4" />
                </video>
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

export default HeroSection;
