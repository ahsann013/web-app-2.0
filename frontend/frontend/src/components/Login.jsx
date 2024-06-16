import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import '../index.css';

const Login = () => {

  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      // Use the baseApiUrl for the API endpoint
      const response = await axios.post('http://20.244.46.184/api/login', formData);
      const { token, admin } = response.data; // Extract token and admin data from response
      // Save token and admin data to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));
      // Redirect to the dashboard route upon successful login
      window.location.href = '/home';
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else if (error.response && error.response.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex radial-gradient p-8 min-h-screen justify-center items-center bg-gradient-to-r from-black to-blue-600">
      <h1 className="text-4xl font-bold mb-4">Welcome to EcoDrive Admin Portal</h1>
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Section: Info Card */}
        <div className="w-1/2 px-8 py-12 bg-black text-white">
          <p className="text-lg mb-4">About EcoDrive</p>
          <p className="text-base text-gray-300">
            EcoDrive is a state-of-the-art platform for managing electric vehicle rentals efficiently and sustainably.
          </p>
          <p className="text-lg mt-8 mb-4">System Information</p>
          <div className="flex justify-between text-base text-gray-300">
            <p>Total Users:</p>
            <p>500</p>
          </div>
          <div className="flex justify-between text-base text-gray-300">
            <p>Total Bikes:</p>
            <p>100</p>
          </div>
          <p className="text-lg mt-8 mb-4">System Features</p>
          <ul className="list-disc list-inside text-base text-gray-300">
            <li>Manage bike fleet</li>
            <li>Track trips</li>
            <li>Handle payments</li>
            <li>Monitor system performance</li>
          </ul>
        </div>

        {/* Vertical Divider Line */}
        <div className="border-l border-gray-300"></div>

        {/* Right Section: Login Form */}
        <div className="w-1/2 flex justify-center items-center p-8">
          <div className="max-w-md w-full">
            <h2 className="text-3xl text-black font-bold mb-8 text-center">Login</h2>
            <LoginForm handleSubmit={handleSubmit} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
