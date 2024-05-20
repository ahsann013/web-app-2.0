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
    <form className="p-10 shadow-xl border border-blue-600 bg-blue-200 rounded-xl" onSubmit={handleFormSubmit}>
    
    <div className='text-2xl text-black flex-1 w-full mx-auto px-auto justify-center'>
<h2 className='flex pt-1 pb-8 font-bold justify-center'>BURAAQ EV</h2>
<h1 className="flex text-black justify-center text-xl lg:text-2xl font-bold mb-8 ">Login</h1>
    </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-black font-md mb-2">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="text-black border border-blue-600 rounded w-full py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Username"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block  text-black font-md mb-2">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="appearance-none border-blue-600 border text-black rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="*****"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex items-center justify-center">
        <button type="submit" className="text-lg px-4 transition duration-400 ease-out hover:ease-out py-3 mx-4 leading-none border rounded-lg text-black border-blue-600 bg-white hover:border-transparent hover:text-white hover:bg-blue-400 mt-2 lg:mt-0">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
