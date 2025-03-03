import React from 'react';

const FeaturedCourses = ({ handleExploreCourses }) => {
  const courses = [
    {
      title: "Introduction to Programming",
      instructor: "Dr. Michael Smith",
      level: "Beginner",
      rating: 4.8,
      students: 12540,
      image: "/api/placeholder/400/225",
      category: "Computer Science",
      price: "Free"
    },
    {
      title: "Advanced Data Analysis",
      instructor: "Prof. Lisa Johnson",
      level: "Advanced",
      rating: 4.9,
      students: 8320,
      image: "/api/placeholder/400/225",
      category: "Data Science",
      price: "Premium"
    },
    {
      title: "French for Beginners",
      instructor: "Claire Dubois",
      level: "Beginner",
      rating: 4.7,
      students: 9856,
      image: "/api/placeholder/400/225",
      category: "Languages",
      price: "Free"
    }
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Courses</h2>
          <button 
            onClick={handleExploreCourses}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
          >
            View All Courses
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">{course.category}</span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">{course.level}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">by {course.instructor}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-800">{course.rating}</span>
                    <span className="text-gray-500 text-sm ml-2">({course.students.toLocaleString()} students)</span>
                  </div>
                  <span className={`font-bold ${course.price === 'Free' ? 'text-green-600' : 'text-blue-600'}`}>{course.price}</span>
                </div>
                
                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;