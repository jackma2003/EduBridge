import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up for free and set up your learner profile with your interests, goals, and preferences."
    },
    {
      number: "02",
      title: "Discover Courses",
      description: "Browse our extensive catalog of courses across various subjects and difficulty levels."
    },
    {
      number: "03",
      title: "Personalized Learning Path",
      description: "Get a customized learning journey based on your goals, prior knowledge, and learning style."
    },
    {
      number: "04",
      title: "Learn at Your Pace",
      description: "Access content online or offline, track your progress, and learn at a schedule that works for you."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started with EduBridge is easy. Follow these simple steps to begin your 
            personalized learning journey.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-light -translate-x-1/2 z-0"></div>
          
          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
              >
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} mb-8 md:mb-0`}>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg z-20">
                  {step.number}
                </div>
                
                <div className="md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="btn btn-primary">Get Started Today</button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;