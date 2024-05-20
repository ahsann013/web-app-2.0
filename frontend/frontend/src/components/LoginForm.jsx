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
    <form className="p-10" onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-white font-md mb-2">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-white font-md mb-2">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="appearance-none border text-black rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex items-center justify-center">
        <button type="submit" className="text-lg px-4 transition duration-400 ease-out hover:ease-out py-3 mx-4 leading-none border rounded-lg text-white border-white hover:border-transparent hover:text-white hover:bg-amber-400 mt-2 lg:mt-0">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
