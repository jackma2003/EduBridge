import React from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboardHeader = ({ teacher, teacherProfile, teacherInitials }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {/* Initials-based avatar instead of profile picture */}
            <div className="h-16 w-16 rounded-full flex items-center justify-center text-white font-medium text-xl bg-gray-700">
              {teacherInitials}
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900">{teacher?.name}</h2>
            <p className="text-sm font-medium text-gray-500">
              {teacherProfile?.title} at {teacherProfile?.institution}
            </p>
          </div>
          <div className="ml-auto">
            <Link
              to="/courses/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardHeader;