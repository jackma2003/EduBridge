import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-gray-800">
              <span className="text-2xl text-primary mr-2">
                <FaGraduationCap />
              </span>
              <span className="font-bold text-xl">EduBridge</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleNavbar}
              className="text-gray-600 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">
              Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-primary font-medium">
              Courses
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium">
              Contact
            </Link>
          </div>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/login" className="text-primary font-semibold px-4 py-2 rounded-md hover:bg-primary/10 transition duration-300">
              Login
            </Link>
            <Link to="/register" className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300 transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 px-2 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link 
              to="/" 
              className="block py-2 px-3 text-center text-gray-700 hover:bg-primary/10 hover:text-primary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="block py-2 px-3 text-center text-gray-700 hover:bg-primary/10 hover:text-primary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className="block py-2 px-3 text-center text-gray-700 hover:bg-primary/10 hover:text-primary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 px-3 text-center text-gray-700 hover:bg-primary/10 hover:text-primary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            
            {/* Auth buttons in mobile menu */}
            <div className="mt-4 flex flex-col space-y-2 px-3">
              <Link 
                to="/login" 
                className="block w-full text-center py-2 text-primary border border-primary rounded-md hover:bg-primary/10"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block w-full text-center py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;