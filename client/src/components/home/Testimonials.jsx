import React, { useState } from 'react';

const Testimonials = () => {
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
    <section className="py-20 bg-primary bg-opacity-5">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their education with EduBridge.
          </p>
        </div>

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
      </div>
    </section>
  );
};

export default Testimonials;