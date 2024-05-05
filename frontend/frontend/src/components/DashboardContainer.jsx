import React from 'react';
import SideBar from './SideBar';
const DashboardContainer = ({ children }) => {
  return (
    <div className="flex flex-col flex-grow bg-black h-screen p-2">
   <SideBar/>
      {children} 
    </div>
  );
};

export default DashboardContainer;
