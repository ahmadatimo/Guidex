import React from 'react';
//import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css";
import Sidebar from '../components/SideBar';

const VisitorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
      <ToastContainer />
    </>
  );
};

export default VisitorLayout;
