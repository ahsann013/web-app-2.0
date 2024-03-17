import React from 'react';
import SideBar from './SideBar';
const DashboardContainer = ({ children }) => {
  return (
    <div className="bg-black h-screen p-3">
   <SideBar/>
      {children} 
    </div>
  );
};

export default DashboardContainer;
