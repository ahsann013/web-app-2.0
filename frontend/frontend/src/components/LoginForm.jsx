import React, { useState } from 'react';

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    handleSubmit({ username, password });
  };

  return (
    <form className="mx-auto max-w-md shadow-lg rounded-lg overflow-hidden bg-white p-8 transform hover:scale-102 transition-transform duration-500">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">EcoDrive</h1>
        <p className="text-lg text-gray-600">Admin Portal Login</p>
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-800 font-medium mb-2">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="text-gray-800 border border-gray-300 rounded w-full py-2 px-3 bg-gray-100 leading-tight focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Admin username"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-800 font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="text-gray-800 border border-gray-300 rounded w-full py-2 px-3 bg-gray-100 leading-tight focus:outline-none focus:ring focus:border-blue-500"
          placeholder="******"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleFormSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
