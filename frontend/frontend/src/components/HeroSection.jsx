import React from 'react';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="  h-screen top-0  bg-black text-white py-16" >
            <div className="container mx-auto text-center">
                <h1 className="text-4xl py-24 font-bold mb-4">Welcome to Admin Portal</h1>
                <p className="text-lg mb-16">Dive into the World of Smart Renting System.</p>
                <NavLink to="/Login" className="bg-amber-400 text-white py-2 px-6 rounded-full hover:bg-amber-600 transition duration-300">Login as Admin</NavLink>
            </div>
   
           
        </div>
    );
};

export default HeroSection;
