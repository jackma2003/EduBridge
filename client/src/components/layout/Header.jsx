import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-primary text-2xl font-bold">EduBridge</span>
            <span className="ml-2 text-gray-500">🌉</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-primary">Home</a>
            <a href="#" className="text-gray-600 hover:text-primary">Courses</a>
            <a href="#" className="text-gray-600 hover:text-primary">Features</a>
            <a href="#" className="text-gray-600 hover:text-primary">About</a>
            <a href="#" className="text-gray-600 hover:text-primary">Contact</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="btn btn-secondary">Log In</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-500 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 hover:text-primary">Home</a>
              <a href="#" className="text-gray-600 hover:text-primary">Courses</a>
              <a href="#" className="text-gray-600 hover:text-primary">Features</a>
              <a href="#" className="text-gray-600 hover:text-primary">About</a>
              <a href="#" className="text-gray-600 hover:text-primary">Contact</a>
            </nav>
            <div className="mt-4 flex flex-col space-y-2">
              <button className="btn btn-secondary w-full">Log In</button>
              <button className="btn btn-primary w-full">Sign Up</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;