import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: "10K+", label: "Courses" },
    { number: "500+", label: "Expert Instructors" },
    { number: "8M+", label: "Students Worldwide" },
    { number: "20+", label: "Languages Supported" }
  ];
  
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;