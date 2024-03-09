import React from 'react';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="  h-screen top-0  bg-gray-800 text-white py-16" >
            <div className="container mx-auto text-center">
                <h1 className="text-4xl py-24 font-bold mb-4">Welcome to Your Website</h1>
                <p className="text-lg mb-16">Discover amazing content and explore the possibilities.</p>
                <NavLink to="/Login" className="bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-600 transition duration-300">Get Started</NavLink>
            </div>
   
           
        </div>
    );
};

export default HeroSection;
