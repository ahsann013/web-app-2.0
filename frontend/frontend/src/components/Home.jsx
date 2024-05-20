import React from 'react';
import DashboardContainer from './DashboardContainer';
import { Link } from 'react-router-dom';
import NotificationPanel from './NotificationPanel';

import { Card as MUICard, CardContent, Typography } from '@mui/material';

const Card = ({ path, title, description }) => {
  return (
    <Link to={path} className="block">
      <MUICard className="bg-purple-600 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <CardContent>
          <Typography variant="h5" component="h3" className="text-white mb-4 font-semibold">
            {title}
          </Typography>
          <Typography variant="body1" className="text-black mb-2">
            {description}
          </Typography>
          {/* Add a preview of the section if needed */}
          <div className="h-24 border-t border-gray-400 mt-4 pt-4">
            {/* Add preview content here */}
          </div>
        </CardContent>
      </MUICard>
    </Link>
  );
};



const Home = () => {
  return (
    <DashboardContainer>
      <div className="m-1 bg-blue-400 rounded-md text-black p-5 ">
    
        <h1 className="text-3xl font-bold mb-6 text-black">Overview Home</h1>

        {/* Cards for different sections */}
        <div className="grid mb-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Ride History */}
          <Card
            path="/history"
            title="Ride History"
            description=" Trip details"
          />

          {/* Card 2: User Data */}
          <Card
          className = 'bg-blue-400'
            path="/users"
            title="User Data"
            description="Manage user profiles and data"
          />

          {/* Add more cards for other sections if needed */}
        </div>

        {/* Notifications log */}
      <NotificationPanel/>
      </div>
    </DashboardContainer>
  );
};

export default Home;
