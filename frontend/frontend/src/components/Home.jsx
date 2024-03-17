import React from 'react';
import DashboardContainer from './DashboardContainer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <DashboardContainer>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Overview Home</h1>

        {/* Cards for different sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Ride History */}
          <Link to="/ride-history" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-4">Ride History</h3>
            <p className="text-gray-600 mb-2">View your past rides and trip details</p>
            {/* Add a preview of the ride history section */}
            <div className="h-24 border-t border-gray-300 pt-4">
              {/* Add preview content here */}
            </div>
          </Link>

          {/* Card 2: User Data */}
          <Link to="/user-data" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-4">User Data</h3>
            <p className="text-gray-600 mb-2">Manage user profiles and data</p>
            {/* Add a preview of the user data section */}
            <div className="h-24 border-t border-gray-300 pt-4">
              {/* Add preview content here */}
            </div>
          </Link>

          {/* Add more cards for other sections if needed */}
        </div>

        {/* Notifications log */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Notifications Log</h2>
          {/* Notification items */}
          <ul>
            {/* Sample notification item */}
            <li className="text-gray-400 mb-2">
              <span className="text-gray-600">[Date]</span>Accident Recorded
            </li>
            <li className="text-gray-400 mb-2">
              <span className="text-gray-600">[Date]</span> New User Registered
            </li>
            <li className="text-gray-400 mb-2">
              <span className="text-gray-600">[Date]</span> Bike Health Status
            </li>
            {/* Add more notification items as needed */}
          </ul>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Home;
