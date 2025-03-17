import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Wave separator */}
      <div className="h-16 bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-16 transform translate-y-1">
          <path fill="#111827" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,154.7C672,171,768,181,864,176C960,171,1056,149,1152,144C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-3">🌉</div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">EduBridge</h3>
                <p className="text-xs text-gray-400 tracking-wider">LEARNING WITHOUT BOUNDARIES</p>
              </div>
            </div>
            <p className="mb-6 text-gray-400">Breaking down educational barriers with personalized, inclusive learning experiences for students around the world.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-blue-400 hover:text-white transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-purple-600 hover:text-white transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-blue-800 hover:text-white transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.8 0 0 .8 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" /></svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              For Students
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600"></span>
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                How to Enroll
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Our Certifications
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Financial Aid
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Mobile Learning
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Success Stories
              </a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              For Educators
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600"></span>
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Become an Instructor
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Course Creation
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Teacher Resources
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Partner With Us
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Success Stories
              </a></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Stay Connected
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600"></span>
            </h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates, educational resources, and special offers.</p>
            <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 flex-grow"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Available on</h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 transition-colors flex items-center">
                  <svg className="h-6 w-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.9 3H6.1C5.08 3 4.25 3.83 4.25 4.85v14.3c0 1.02.83 1.85 1.85 1.85h11.8c1.02 0 1.85-.83 1.85-1.85V4.85C19.75 3.83 18.92 3 17.9 3zM7 5h10v13H7V5zm5 14.5c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-300">Mobile App</span>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 transition-colors flex items-center">
                  <svg className="h-6 w-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 4.27l2 2V18c0 1.1.9 2 2 2h12.73l2 2L21 21.27 4 4.27 2.27 3 1 4.27 2 5.27zM4 2.73l16 16V4c0-1.1-.9-2-2-2H5.27l-1.27-1.27z" />
                    <path d="M22 18.9c0 .36-.23.64-.64.86-.4.13-.83.24-1.28.24-1.22 0-2.13-.6-2.13-1.7 0-1.12.94-1.82 2.13-1.82.46 0 .88.1 1.28.24.4.22.64.5.64.86v1.32zm-3.05-5.97c-.4-.38-.94-.57-1.6-.57-1.23 0-2.08.77-2.08 1.82 0 1.07.82 1.7 2.14 1.7.48 0 1.1-.1 1.54-.3v1.2c-.44.24-1.04.35-1.54.35-1.98 0-3.27-1.08-3.27-2.94 0-1.8 1.38-3.03 3.27-3.03.57 0 1.13.17 1.56.46l-.02 1.3z" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-300">Desktop App</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} EduBridge. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-400 transition-colors mb-2 md:mb-0">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors mb-2 md:mb-0">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors mb-2 md:mb-0">Accessibility</a>
            <a href="#" className="hover:text-blue-400 transition-colors mb-2 md:mb-0">Cookie Policy</a>
            <a href="/setup-admin" className="text-gray-600 hover:text-blue-400 transition-colors text-xs mb-2 md:mb-0 ml-2 border-l border-gray-700 pl-2">First Admin Setup</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;