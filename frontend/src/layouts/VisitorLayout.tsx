import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/TopScroll";
import { Outlet } from "react-router-dom";

const VisitorLayout: React.FC = () => {
  return (
    <div>
      <div className="px-5">
        <NavBar />
      </div>
      <Outlet /> 
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default VisitorLayout;
