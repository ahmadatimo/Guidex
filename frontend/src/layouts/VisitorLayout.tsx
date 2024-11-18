import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const VisitorLayout: React.FC = () => {
  return (
    <div>
      <div className="px-5">
        <NavBar />
      </div>
      <Outlet /> 
      <Footer />
    </div>
  );
};

export default VisitorLayout;
