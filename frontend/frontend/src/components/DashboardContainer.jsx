import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';

const DashboardContainer = ({ children }) => {
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    // Calculate the height of the content
    const content = document.getElementById('dashboard-content');
    if (content) {
      setContentHeight(content.clientHeight);
    }
  }, [children]);

  return (
    <div className={`bg-emerald-700 ${contentHeight > window.innerHeight ? 'h-screen-0 p-2' : 'h-screen p-2' }`}>
      <SideBar />
      <div id="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardContainer;
