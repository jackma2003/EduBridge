import React from 'react';

const HowItWorks = ({ handleGetStarted }) => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up for free and set up your learner profile with your interests, goals, and preferences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Discover Courses",
      description: "Browse our extensive catalog of courses across various subjects and difficulty levels.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Personalized Learning Path",
      description: "Get a customized learning journey based on your goals, prior knowledge, and learning style.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Learn at Your Pace",
      description: "Access content online or offline, track your progress, and learn at a schedule that works for you.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    }
  ];
  
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Simple Process
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Getting started with EduBridge is easy. Follow these simple steps to begin your 
            personalized learning journey.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
              >
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute w-16 border-t-2 border-dashed border-blue-200 right-0 top-16 translate-x-1/2"></div>
                )}
                
                {/* Step circle */}
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                
                <div className="text-blue-600 mb-6 mt-2 group-hover:text-indigo-600 transition-colors">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center justify-center mx-auto"
            onClick={handleGetStarted}
          >
            <span>Get Started Today</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;