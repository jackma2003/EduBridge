import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaEnvelope, 
  FaGraduationCap
} from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and social section */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl text-primary mr-2">
                <FaGraduationCap />
              </span>
              <span className="font-bold text-xl">EduBridge</span>
            </div>
            <p className="text-gray-300 mb-6">
              Breaking down educational barriers and creating accessible 
              learning experiences for learners worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-primary transition-all duration-300 hover:-translate-y-1">
                <FaFacebook className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-primary transition-all duration-300 hover:-translate-y-1">
                <FaTwitter className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-primary transition-all duration-300 hover:-translate-y-1">
                <FaInstagram className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-primary transition-all duration-300 hover:-translate-y-1">
                <FaLinkedin className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-10 after:h-1 after:bg-primary">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-10 after:h-1 after:bg-primary">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-10 after:h-1 after:bg-primary">
              Contact Us
            </h4>
            <div className="mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="text-primary" />
                <span>info@edubridge.com</span>
              </div>
            </div>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 py-2 px-3 rounded-l-md focus:outline-none"
              />
              <button className="bg-primary hover:bg-primary-dark text-white px-4 rounded-r-md transition-colors duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="bg-black/20 py-4 text-center">
        <p className="text-gray-400 text-sm">
          © {year} EduBridge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;