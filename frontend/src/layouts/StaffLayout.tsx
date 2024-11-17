import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import StaffFooter from '../components/StaffFooter';

const StaffLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-full bg-white shadow-lg">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="pl-20 flex-1 pt-6 bg-gray-100">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <div className="pl-20">
        <StaffFooter />
      </div>
    </div>
  );
};

export default StaffLayout;
