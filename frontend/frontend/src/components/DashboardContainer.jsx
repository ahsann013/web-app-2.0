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
    <div className="radial-gradient-2">
      <SideBar />
      <div id="dashboard-content" className="flex-grow p-2">
        {children}
      </div>
    </div>
  );
};

export default DashboardContainer;
