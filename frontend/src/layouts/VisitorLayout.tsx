import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/TopScroll";
import { Outlet } from "react-router-dom";

const VisitorLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="px-5">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VisitorLayout;
