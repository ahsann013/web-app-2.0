// Overview.js (similar structure for other components)
import React from 'react';
import DashboardContainer from './DashboardContainer';

const RideHistory = () => {
  return (
    <DashboardContainer>
     
      <h1>Ride History Section</h1>
      <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Ride History</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Ride History Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Ride #1234</h3>
          <p className="text-gray-600">Date: January 15, 2023</p>
          <p className="text-gray-600">Distance: 20 km</p>
          {/* Add more details as needed */}
        </div>

        {/* Sample Ride History Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Ride #5678</h3>
          <p className="text-gray-600">Date: February 25, 2023</p>
          <p className="text-gray-600">Distance: 15 km</p>
          {/* Add more details as needed */}
        </div>

        {/* Sample Ride History Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Ride #91011</h3>
          <p className="text-gray-600">Date: March 10, 2023</p>
          <p className="text-gray-600">Distance: 25 km</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
    </DashboardContainer>
  );
};

export default RideHistory;
