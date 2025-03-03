import React from 'react';

const Features = () => {
  const features = [
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
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform is designed from the ground up to provide an exceptional learning experience 
            with features that make education accessible, engaging, and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
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
  );
};

export default Features;