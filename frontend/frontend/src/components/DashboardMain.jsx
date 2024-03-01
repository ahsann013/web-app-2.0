import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex items-center h-screen justify-center py-32 bg-teal-100">
      <div className="w-full max-w-md">
        <h2 className="text-2xl text-center text-teal-600 mb-6">Dashboard</h2>
        <div className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4">
          <div className="flex items-center justify-center">
            <h3 className="text-xl text-center text-gray-700 mb-4">Welcome to the Dashboard</h3>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-center text-gray-600 mb-8">Here you can view and manage your account information and settings.</p>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Go to Account Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;