import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import all modernized component sections
import Header from './homepage/Header';
import HeroSection from './homepage/HeroSection';
import PopularSubjects from './homepage/PopularSubjects';
import FeaturesSection from './homepage/FeaturesSection';
import FeaturedCourses from './homepage/FeaturedCourses';
import HowItWorks from './homepage/HowItWorks';
import StatsSection from './homepage/StatsSection';
import TestimonialsSlider from './homepage/TestimonialsSlider';
import CTASection from './homepage/CTASection';
import Footer from './homepage/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);
  
  // Navigation handlers
  const handleGetStarted = () => {
    navigate('/register');
  };
  
  const handleLogin = (role) => {
    // For role-specific login, you could pass a query param or state
    if (role) {
      navigate('/login', { state: { role } });
    } else {
      navigate('/login');
    }
    setShowRoleSelector(false);
  };
  
  const handleExploreCourses = () => {
    navigate('/courses');
  };
  
  const handleExploreFeatures = () => {
    document.getElementById('features-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  // Toggle role selector dropdown
  const toggleRoleSelector = () => {
    setShowRoleSelector(!showRoleSelector);
  };
  
  return (
    <div className="bg-white">
      <Header 
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        showRoleSelector={showRoleSelector}
        toggleRoleSelector={toggleRoleSelector}
        handleLogin={handleLogin}
        handleGetStarted={handleGetStarted}
      />
      
      <HeroSection 
        handleGetStarted={handleGetStarted}
        handleExploreCourses={handleExploreCourses}
      />
      
      <PopularSubjects />
      
      <FeaturesSection />
      
      <StatsSection />
      
      <HowItWorks 
        handleGetStarted={handleGetStarted}
      />
      
      <TestimonialsSlider />
      
      <CTASection 
        handleGetStarted={handleGetStarted}
        handleExploreFeatures={handleExploreFeatures}
      />
      
      <Footer />
    </div>
  );
};

export default HomePage;