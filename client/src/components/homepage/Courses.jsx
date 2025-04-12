import React from "react";

const Courses = ({ handleExploreCourses }) => {
  const featured = [
    {
      title: "Introduction to Programming",
      instructor: "Dr. Michael Smith",
      level: "Beginner",
      rating: 4.8,
      students: 12540,
      image: "/introprogram.png",
      category: "Computer Science",
      price: "Free",
    },
    {
      title: "Advanced Data Analysis",
      instructor: "Prof. Lisa Johnson",
      level: "Advanced",
      rating: 4.9,
      students: 8320,
      image: "/dataanal.png",
      category: "Data Science",
      price: "Premium",
    },
    {
      title: "French for Beginners",
      instructor: "Claire Dubois",
      level: "Beginner",
      rating: 4.7,
      students: 9856,
      image: "/french.png",
      category: "Languages",
      price: "Free",
    },
  ];

  const computerscience = [
    {
      title: "Introduction to Programming",
      instructor: "Dr. Michael Smith",
      level: "Beginner",
      rating: 4.8,
      students: 12540,
      image: "/introprogram.png",
      category: "Computer Science",
      price: "Free",
    },
    {
      title: "Data Structures and Algorithms",
      instructor: "Prof. John Doe",
      level: "Intermediate",
      rating: 4.6,
      students: 5432,
      image: "/data_structures.png",
      category: "Computer Science",
      price: "Premium",
    },
    {
      title: "Web Development Bootcamp",
      instructor: "Jane Smith",
      level: "Beginner",
      rating: 4.8,
      students: 12000,
      image: "/webdev.png",
      category: "Web Development",
      price: "Free",
    },
  ];

  const mathematics = [
    {
      title: "Calculus I",
      instructor: "Dr. Emily Davis",
      level: "Beginner",
      rating: 4.7,
      students: 6789,
      image: "/calculus.png",
      category: "Mathematics",
      price: "Free",
    },
    {
      title: "Linear Algebra",
      instructor: "Prof. Robert Brown",
      level: "Intermediate",
      rating: 4.5,
      students: 4321,
      image: "/linear_algebra.png",
      category: "Mathematics",
      price: "Premium",
    },
    {
      title: "Advanced Data Analysis",
      instructor: "Prof. Lisa Johnson",
      level: "Advanced",
      rating: 4.9,
      students: 8320,
      image: "/dataanal.png",
      category: "Data Science",
      price: "Premium",
    },
  ];

  const languages = [
    {
      title: "Spanish for Beginners",
      instructor: "Maria Garcia",
      level: "Beginner",
      rating: 4.6,
      students: 4567,
      image: "/spanish.png",
      category: "Languages",
      price: "Premium",
    },
    {
      title: "French for Beginners",
      instructor: "Claire Dubois",
      level: "Beginner",
      rating: 4.7,
      students: 9856,
      image: "/french.png",
      category: "Languages",
      price: "Free",
    },
    {
      title: "Chinese Language Course",
      instructor: "Li Wei",
      level: "Advanced",
      rating: 4.8,
      students: 3456,
      image: "/chinese.png",
      category: "Languages",
      price: "Premium",
    },
  ];


  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Courses</h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    {course.category}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">by {course.instructor}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-800">
                      {course.rating}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({course.students.toLocaleString()} students)
                    </span>
                  </div>
                  <span
                    className={`font-bold ${
                      course.price === "Free"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {course.price}
                  </span>
                </div>

                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>

      
      <div className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Computer Science</h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {computerscience.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    {course.category}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">by {course.instructor}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-800">
                      {course.rating}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({course.students.toLocaleString()} students)
                    </span>
                  </div>
                  <span
                    className={`font-bold ${
                      course.price === "Free"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {course.price}
                  </span>
                </div>

                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>


      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Mathematics</h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mathematics.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    {course.category}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">by {course.instructor}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-800">
                      {course.rating}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({course.students.toLocaleString()} students)
                    </span>
                  </div>
                  <span
                    className={`font-bold ${
                      course.price === "Free"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {course.price}
                  </span>
                </div>

                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>


      <div className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Lanugage</h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {languages.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    {course.category}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">by {course.instructor}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-800">
                      {course.rating}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      ({course.students.toLocaleString()} students)
                    </span>
                  </div>
                  <span
                    className={`font-bold ${
                      course.price === "Free"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {course.price}
                  </span>
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

export default Courses;
