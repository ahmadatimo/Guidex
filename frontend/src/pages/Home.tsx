import React from 'react';
import HeroSection from '../components/HeroSection';
import WhyVisitSection from '../components/WhyVisitSection';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import CallToAction from '../components/CallToAction';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WhyVisitSection />
      <Testimonials />
      <HowItWorks />
      <CallToAction />
    </>   
  );
};

export default Home;
