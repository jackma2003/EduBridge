import React from 'react';

const FeaturesSection = () => {
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
    <section id="features-section" className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Platform Features
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Designed for Modern Learning
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our platform is engineered to make education accessible, engaging, and effective
            with features that adapt to how you learn best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 group"
            >
              <div className="flex flex-col">
                <div className="mb-5 p-3 bg-blue-100 text-4xl w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;