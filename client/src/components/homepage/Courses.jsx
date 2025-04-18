import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../../services/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        setLoading(true);
        const response = await getCourses();
        // Get the top 6 courses with highest ratings or newest
        const featuredCourses = response.data.courses
          .sort((a, b) => {
            // Sort by average rating, fallback to newest if no ratings
            if (a.averageRating && b.averageRating) {
              return parseFloat(b.averageRating) - parseFloat(a.averageRating);
            } else if (a.averageRating) {
              return -1;
            } else if (b.averageRating) {
              return 1;
            } else {
              // Sort by creation date if no ratings
              return new Date(b.createdAt) - new Date(a.createdAt);
            }
          })
          .slice(0, 6);
        
        setCourses(featuredCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load featured courses');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Courses
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover our most popular and highly-rated courses
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-8">{error}</div>
        ) : (
          <>
            <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div key={course._id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gray-200 relative">
                    <img 
                      src={course.coverImage || "/default-course.jpg"} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      <Link to={`/courses/${course._id}`} className="hover:text-blue-600">
                        {course.title}
                      </Link>
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-2">
                      {course.instructor?.name || 'Unknown Instructor'}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <svg className="h-4 w-4 text-yellow-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {course.averageRating || '0.0'} ({course.ratings?.length || 0} ratings)
                    </div>
                    
                    <Link 
                      to={`/courses/${course._id}`}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link
                to="/courses"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Explore All Courses
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Courses;