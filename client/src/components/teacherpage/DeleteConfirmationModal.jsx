import React, { useState } from 'react';
import { deleteCourse } from '../../services/api';

const DeleteConfirmationModal = ({ 
  course, 
  courses, 
  setCourses, 
  setStats, 
  actionLoading, 
  setActionLoading, 
  onClose 
}) => {
  const [error, setError] = useState('');

  const confirmDeleteCourse = async () => {
    try {
      setError(''); // Reset any previous errors
      setActionLoading(true);
      await deleteCourse(course._id);
      
      // Update local state
      setCourses(courses.filter(c => c._id !== course._id));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        publishedCourses: course.isPublished 
          ? prev.publishedCourses - 1 
          : prev.publishedCourses,
        draftCourses: !course.isPublished 
          ? prev.draftCourses - 1 
          : prev.draftCourses,
        totalStudents: prev.totalStudents - (course.enrolledStudents?.length || 0)
      }));
      
      // Close modal
      onClose();
    } catch (err) {
      console.error('Failed to delete course:', err);
      setError(err.message || 'Failed to delete course. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full mx-4">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Delete Course
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete "{course?.title}"? This action cannot be undone.
                    {course?.enrolledStudents?.length > 0 && (
                      <span className="block mt-2 text-red-500 font-medium">
                        Warning: This course has {course.enrolledStudents.length} enrolled students.
                      </span>
                    )}
                  </p>
                  
                  {/* Display error message if exists */}
                  {error && (
                    <div className="mt-3 p-2 bg-red-50 border-l-4 border-red-400 text-sm text-red-700">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={confirmDeleteCourse}
              disabled={actionLoading}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {actionLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Delete'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={actionLoading}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;