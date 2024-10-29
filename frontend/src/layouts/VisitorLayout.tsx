import React from 'react';
import "react-toastify/ReactToastify.css";
import Sidebar from '../components/SideBar';

const VisitorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
            {children}
        </div>
      </div>
    </>
  );
};

export default VisitorLayout;
