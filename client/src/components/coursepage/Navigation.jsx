import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isLoggedIn, userRole, user, handleLogout, courseId }) => {
  // Calculate user initials if user exists
  const getUserInitials = () => {
    if (!user || !user.name) return '';
    return user.name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  };

  const userInitials = getUserInitials();

  return (
    <header className="bg-white backdrop-blur-md bg-opacity-90 sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  EduBridge
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-wide">Learning Without Boundaries</p>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to={courseId ? `/courses/${courseId}` : "/courses"} className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group border-blue-500 border-b-2 pb-1">
              My Course
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to={userRole === 'student' ? '/dashboard' : userRole === 'teacher' ? '/teacher' : '/admin'} 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
                  Register
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium text-sm bg-gradient-to-r from-blue-500 to-purple-600">
                  {userInitials}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-5 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login"
                  className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition font-medium"
                >
                  Log In
                </Link>
                <Link 
                  to="/register"
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-200 transition-all font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;