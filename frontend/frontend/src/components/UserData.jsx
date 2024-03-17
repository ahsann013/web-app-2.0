import React from 'react';
import DashboardContainer from './DashboardContainer';

const UserData = () => {
  return (
    <DashboardContainer>
      <h1>User Data Section</h1>
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-6 text-white">User Data</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample User Data Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">User #1</h3>
            <p className="text-gray-600">Name: John Doe</p>
            <p className="text-gray-600">Age: 30</p>
            {/* Add more details as needed */}
          </div>

          {/* Sample User Data Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">User #2</h3>
            <p className="text-gray-600">Name: Jane Smith</p>
            <p className="text-gray-600">Age: 25</p>
            {/* Add more details as needed */}
          </div>

          {/* Sample User Data Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">User #3</h3>
            <p className="text-gray-600">Name: Alex Johnson</p>
            <p className="text-gray-600">Age: 35</p>
            {/* Add more details as needed */}
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default UserData;
