import React, { useState } from 'react';
import axios from 'axios';
import CarImage from './CarImage';
import LoginForm from './LoginForm';

const Login = () => {
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      // Call the login API endpoint
      const response = await axios.post('http://localhost:3000/api/login', formData);
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
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex h-screen w-screen bg-black flex flex-col justify-center items-center p-8 lg:p-10 h-full">
        
      <h1 className="text-white text-2xl lg:text-4xl font-bold mb-8">Welcome to Admin Portal</h1>
      <h1 className="text-white text-2xl lg:text-4xl font-bold mb-8">Login</h1>
        <LoginForm handleSubmit={handleSubmit} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

    </div>
  );
};

export default Login;
