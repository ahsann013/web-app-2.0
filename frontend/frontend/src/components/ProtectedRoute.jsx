import React, { useEffect,  } from 'react';
import { Route, Navigate , useNavigate } from 'react-router-dom';

// Function to check if the user is authenticated


// Protected Route Component
const ProtectedRoute = ( props ) => {
  const { Component } = props;

  const navigate = useNavigate();
  // Check if the user is logged in (e.g., by checking the presence of a token in local storage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);


return (
  <div>
    <Component />
  </div>

);
}

export default ProtectedRoute;
