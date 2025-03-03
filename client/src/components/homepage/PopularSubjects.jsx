import React from 'react';

const PopularSubjects = () => {
  const subjects = [
    { icon: "💻", name: "Computer Science" },
    { icon: "🧮", name: "Mathematics" },
    { icon: "🧪", name: "Science" },
    { icon: "🌎", name: "Languages" },
    { icon: "📊", name: "Business" },
    { icon: "🎨", name: "Arts" }
  ];
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Popular Subject Areas</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {subjects.map((subject, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-3xl mb-2">{subject.icon}</div>
              <h3 className="font-medium text-gray-800">{subject.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSubjects;