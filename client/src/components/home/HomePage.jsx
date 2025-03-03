import React from 'react';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import CTA from './CTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
};

export default HomePage;