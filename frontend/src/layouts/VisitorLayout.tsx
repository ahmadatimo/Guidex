import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';

const VisitorLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto p-4"> 
        <Outlet />
      </div>
    </div>
  );
};

export default VisitorLayout;
