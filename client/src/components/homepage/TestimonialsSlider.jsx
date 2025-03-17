import React, { useState } from 'react';

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
    <section id="testimonials" className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Success Stories
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            What Our Learners Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join thousands of learners who have transformed their education with EduBridge.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial card */}
          <div className="bg-white rounded-3xl shadow-xl p-10 relative border border-gray-100">
            <div className="absolute -top-4 -left-3 text-blue-600 text-8xl opacity-10">"</div>
            <div className="absolute -bottom-10 -right-3 text-blue-600 text-8xl opacity-10">"</div>

            <div className="text-xl text-gray-700 mb-8 italic">
              {testimonials[activeIndex].content}
            </div>
            
            <div className="flex items-center">
              <div className="relative">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-blue-900">{testimonials[activeIndex].name}</h4>
                <p className="text-blue-600 text-sm">{testimonials[activeIndex].role}</p>
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-blue-50 z-20 transition-all hover:scale-110"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-blue-50 z-20 transition-all hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-10 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-blue-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;