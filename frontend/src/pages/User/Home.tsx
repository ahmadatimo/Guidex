import React from 'react';
import HeroSection from '../../components/HeroSection';
import WhyVisitSection from '../../components/WhyVisitSection';
import Testimonials from '../../components/Testimonials';
import HowItWorks from '../../components/HowItWorks';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WhyVisitSection />
      <Testimonials />
      <HowItWorks />
      <div className="text-center mt-6">
        <Link to="visitor/feedback">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Leave Feedback
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
