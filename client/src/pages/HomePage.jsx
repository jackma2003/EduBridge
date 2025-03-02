import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaLaptop, FaUsers, FaGlobe } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center py-12 px-4 md:px-8 bg-gradient-to-br from-primary to-purple-500 text-white">
        <div className="flex-1 flex flex-col justify-center md:pr-8 mb-10 md:mb-0">
          <h1 className="text-5xl font-bold mb-4">EduBridge</h1>
          <h2 className="text-3xl font-light mb-6 text-white/90">Learning Without Boundaries</h2>
          <p className="text-lg mb-8 max-w-2xl">
            An innovative, inclusive digital learning platform designed to break down 
            educational barriers and create accessible learning experiences for learners worldwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/courses" className="btn-primary">
              Explore Courses
            </Link>
            <Link to="/register" className="btn-secondary">
              Join Now
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img 
            src="/images/hero-image.svg" 
            alt="Students learning online" 
            className="max-w-full h-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-gray-100">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Key Features</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card">
              <div className="text-4xl text-primary mb-4">
                <FaGraduationCap />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Personalized Learning</h3>
              <p className="text-gray-600">
                Adaptive learning paths tailored to your learning style and goals
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div className="text-4xl text-primary mb-4">
                <FaGlobe />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Inclusive Design</h3>
              <p className="text-gray-600">
                Multilingual support and accessibility features for all learners
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div className="text-4xl text-primary mb-4">
                <FaLaptop />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Flexible Learning</h3>
              <p className="text-gray-600">
                Learn at your own pace with offline mode and cross-platform compatibility
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card">
              <div className="text-4xl text-primary mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Collaborative Learning</h3>
              <p className="text-gray-600">
                Engage in meaningful discussions and form study groups
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-dark text-white">
        <div className="container text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8">
            Join thousands of learners breaking barriers through education
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;