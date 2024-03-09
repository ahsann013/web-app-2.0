import React from 'react';
import SideBar from './SideBar';
const DashboardContainer = ({ children }) => {
  return (
    <div className="bg-gray-900 h-screen p-2">
   <SideBar/>
      {children} 
    </div>
  );
};

export default DashboardContainer;
