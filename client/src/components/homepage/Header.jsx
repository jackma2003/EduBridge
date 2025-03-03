import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, userRole, showRoleSelector, toggleRoleSelector, handleLogin, handleGetStarted }) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-4xl mr-2">🌉</div>
            <div>
              <h1 className="text-2xl font-bold text-blue-700">EduBridge</h1>
              <p className="text-xs text-gray-500">Learning Without Boundaries</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features-section" className="text-gray-700 hover:text-blue-700">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-700">How It Works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-700">Testimonials</a>
            <a href="/courses" className="text-gray-700 hover:text-blue-700">Courses</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Dashboard
              </button>
            ) : (
              <>
                <div className="relative">
                  <button 
                    onClick={toggleRoleSelector}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                  >
                    Log In 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showRoleSelector && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <button 
                        onClick={() => handleLogin('student')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                      >
                        Student Login
                      </button>
                      <button 
                        onClick={() => handleLogin('teacher')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                      >
                        Teacher Login
                      </button>
                      <button 
                        onClick={() => handleLogin('admin')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                      >
                        Admin Login
                      </button>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={handleGetStarted}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
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