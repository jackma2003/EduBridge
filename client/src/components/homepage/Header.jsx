import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, userRole, showRoleSelector, toggleRoleSelector, handleLogin, handleGetStarted }) => {
  const navigate = useNavigate();
  
  // Handle redirecting to the appropriate dashboard
  const navigateToDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (user.role === 'admin') {
      navigate('/admin');
    } else if (user.role === 'teacher') {
      if (user.isVerified) {
        navigate('/teacher');
      } else {
        navigate('/pending-approval');
      }
    } else {
      navigate('/dashboard');
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; // Force a full page reload to clear any state
  };
  
  return (
    <header className="bg-white backdrop-blur-md bg-opacity-90 sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-4xl mr-3">🌉</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                EduBridge
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">Learning Without Boundaries</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features-section" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/courses" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
              Courses
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={navigateToDashboard}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-200 transition-all font-medium"
                >
                  Dashboard
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition font-medium"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <div className="relative">
                  <button 
                    onClick={toggleRoleSelector}
                    className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition flex items-center font-medium"
                  >
                    Log In 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showRoleSelector && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-10 border border-gray-100">
                      <button 
                        onClick={() => handleLogin('student')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Student Login
                      </button>
                      <button 
                        onClick={() => handleLogin('teacher')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Teacher Login
                      </button>
                      <button 
                        onClick={() => handleLogin('admin')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Admin Login
                      </button>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={handleGetStarted}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-200 transition-all font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;