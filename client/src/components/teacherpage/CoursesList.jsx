import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateCourse } from '../../services/api';
import { generateBgColor } from './uiHelpers';

const CoursesList = ({ courses, setCourses, setStats, actionLoading, setActionLoading, onDeleteClick }) => {
  const navigate = useNavigate();

  // Toggle course publish status
  const handleTogglePublish = async (course) => {
    try {
      setActionLoading(true);
      const updatedCourse = {
        ...course,
        isPublished: !course.isPublished
      };
      
      await updateCourse(course._id, updatedCourse);
      
      // Update local state
      setCourses(courses.map(c => 
        c._id === course._id ? {...c, isPublished: !c.isPublished} : c
      ));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        publishedCourses: course.isPublished 
          ? prev.publishedCourses - 1 
          : prev.publishedCourses + 1,
        draftCourses: course.isPublished 
          ? prev.draftCourses + 1 
          : prev.draftCourses - 1
      }));
    } catch (err) {
      console.error('Failed to update course publish status:', err);
    } finally {
      setActionLoading(false);
    }
  };
  
  // Handle edit course
  const handleEditCourse = (course) => {
    navigate(`/courses/edit/${course._id}`);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Your Courses
        </h3>
        <Link
          to="/courses/create"
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
        >
          <svg className="mr-1.5 -ml-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Course
        </Link>
      </div>
      <div className="bg-white divide-y divide-gray-200">
        {courses.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">You haven't created any courses yet.</p>
            <Link
              to="/courses/create"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Your First Course
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {courses.map((course) => {
              const bgGradient = generateBgColor(course.title);
              
              return (
                <li key={course._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        {/* Gradient background instead of image */}
                        <div className={`h-12 w-12 rounded bg-gradient-to-br ${bgGradient} flex items-center justify-center`}>
                          <span className="text-white font-medium text-xs">
                            {course.title.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 px-4">
                        <div>
                          <Link to={`/courses/${course._id}`} className="text-sm font-medium text-blue-600 truncate hover:underline">
                            {course.title}
                          </Link>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="truncate">{course.description.substring(0, 100)}...</span>
                          </p>
                          <div className="mt-2 flex">
                            <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">
                              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                            </span>
                            <span className="inline-flex items-center text-xs text-gray-500">
                              <svg className="mr-1 h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {course.averageRating || '0.0'} ({course.ratings?.length || 0} reviews)
                            </span>
                            <span className="inline-flex items-center text-xs text-gray-500 ml-2">
                              <svg className="mr-1 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                              </svg>
                              {course.enrolledStudents?.length || 0} students
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        course.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                      
                      <button
                        onClick={() => handleTogglePublish(course)}
                        disabled={actionLoading}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
                        title={course.isPublished ? "Unpublish" : "Publish"}
                      >
                        {course.isPublished ? (
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-gray-100"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => onDeleteClick(course)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-gray-100"
                        title="Delete"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CoursesList;