import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NavLink = ({ href, children }) => (
  <a
      href={href}
      className="block lg:inline-block lg:mt-0 font-bold text-white text hover:text-white hover:bg-teal-400 p-2 transition duration-300 ease-out hover:ease-in rounded-3xl hover:shadow-lg"
  >
      {children}
  </a>
);
const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex h-screen">
      
     
      <div className="w-1/4 bg-gray-800 flex items-center justify-center">
        <div className='top-3 left-4 absolute'>
        <button className="text-sm transition duration-400 ease-out hover:ease-out border rounded-3xl text-white border-white hover:border-transparent hover:text-white hover:bg-teal-400  lg:mt-0"
                    ><NavLink href = "/" >
                      
                      < ArrowBackIcon/></NavLink></button>
        </div>
        <form className="p-10" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="emailOrUsername" className="block text-white font-md mb-2">Email or Username</label>
            <input type="text" id="emailOrUsername" value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white font-md mb-2">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            <a href="#" className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800">Forgot Password?</a>
          </div>
          <div className="flex items-center justify-center">
            <button className="text-lg px-4 transition duration-400 ease-out hover:ease-out py-3 mx-4 leading-none border rounded-lg text-white border-white hover:border-transparent hover:text-white hover:bg-teal-400 mt-2 lg:mt-0"
                    >Login</button>
          </div>
        </form>
      </div>
      <div className="w-4/5 bg-gray-200 flex items-center justify-center">
        {/* Image goes here */}
      </div>
    </div>
  );
};

export default Login;