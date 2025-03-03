import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Navigate to register page
  const handleGetStarted = () => {
    navigate('/register');
  };
  
  // Navigate to courses page (you'll need to create this page later)
  const handleExploreCourses = () => {
    navigate('/courses');
  };
  
  // Navigate to features section by scrolling
  const handleExploreFeatures = () => {
    document.getElementById('features-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  
  return (
    <>
      {/* Hero Section */}
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
                <button 
                  className="btn bg-white text-blue-700 hover:bg-blue-50 font-semibold"
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
                <button 
                  className="btn border border-white text-white hover:bg-white hover:bg-opacity-10"
                  onClick={handleExploreCourses}
                >
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

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform is designed from the ground up to provide an exceptional learning experience 
              with features that make education accessible, engaging, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Personalized Learning",
                description: "Intelligent algorithms create custom learning journeys tailored to individual learning styles, knowledge levels, and goals."
              },
              {
                icon: "🌐",
                title: "Inclusive Design",
                description: "Content available in multiple languages with seamless language switching and WCAG 2.1 AA compliant interface."
              },
              {
                icon: "🔒",
                title: "Flexible Learning",
                description: "Download course content for learning without internet connectivity with automatic progress synchronization when online."
              },
              {
                icon: "🤝",
                title: "Collaborative Learning",
                description: "Engage in meaningful academic discussions, form peer learning communities, and provide structured feedback."
              },
              {
                icon: "📚",
                title: "Rich Content Ecosystem",
                description: "Diverse content types including video lectures, interactive quizzes, documents, and assignments with content localization support."
              },
              {
                icon: "📊",
                title: "Progress Tracking",
                description: "Comprehensive dashboards provide real-time insights into learning progress, achievements, and areas for improvement."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-secondary p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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
              {[
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
              ].map((step, index) => (
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
            <button 
              className="btn btn-primary"
              onClick={handleGetStarted}
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary bg-opacity-5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their education with EduBridge.
            </p>
          </div>

          <TestimonialsSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of learners worldwide who are transforming their education
              with EduBridge's personalized learning platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                className="btn bg-white text-blue-700 hover:bg-blue-50 font-semibold"
                onClick={handleGetStarted}
              >
                Create Free Account
              </button>
              <button 
                className="btn border border-white text-white hover:bg-white hover:bg-opacity-10"
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
    </>
  );
};

// Testimonials slider component
const TestimonialsSlider = () => {
  const testimonials = [
    {
      id: 1,
      content: "EduBridge transformed my learning experience. The personalized approach helped me master concepts I struggled with for years. Now I'm pursuing my dream career thanks to the skills I gained.",
      name: "Sarah Johnson",
      role: "Software Developer",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 2,
      content: "As a teacher, I've seen how EduBridge helps my students progress at their own pace. The analytics provide valuable insights that help me tailor my instruction to meet individual needs.",
      name: "Michael Rodriguez",
      role: "High School Teacher",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 3,
      content: "The offline learning feature was a game-changer for me. Living in a rural area with unstable internet, I can download materials and study without interruption. EduBridge truly breaks barriers.",
      name: "Aisha Patel",
      role: "Medical Student",
      avatar: "/api/placeholder/100/100"
    },
    {
      id: 4,
      content: "I've tried many learning platforms, but EduBridge stands out with its collaborative features. The study groups and peer reviews have enriched my learning beyond just consuming content.",
      name: "David Chen",
      role: "Business Analyst",
      avatar: "/api/placeholder/100/100"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 relative">
        <div className="absolute -top-5 left-10 text-primary text-6xl opacity-20">"</div>

        <div className="text-lg text-gray-700 mb-6 relative z-10">
          {testimonials[activeIndex].content}
        </div>
        
        <div className="flex items-center">
          <img 
            src={testimonials[activeIndex].avatar} 
            alt={testimonials[activeIndex].name}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div>
            <h4 className="font-semibold">{testimonials[activeIndex].name}</h4>
            <p className="text-gray-500 text-sm">{testimonials[activeIndex].role}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === activeIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button 
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors duration-200"
          aria-label="Previous testimonial"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors duration-200"
          aria-label="Next testimonial"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomePage;