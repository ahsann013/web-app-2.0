import { ManageAccounts } from '@mui/icons-material';
import React from 'react';
import Footer from './Footer';

// Link component
const NavLink = ({ href, children }) => (
    <a
        href={href}
        className="block lg:inline-block lg:mt-0 font-bold text-white text hover:text-white hover:bg-teal-400 p-3 transition duration-300 ease-out hover:ease-in rounded-3xl mr-4 hover:shadow-lg"
    >
        {children}
    </a>
);

const NavBar = () => {
    return (
        <nav className="flex size-full items-center sticky top-0 justify-between flex-wrap bg-gray-800 p-2">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <NavLink href="/">
                    <img src="./src/assets/ev.png" alt="" className="rounded-lg" style={{ height: '60px' }} />
                </NavLink>
                <span className="font-semibold text-3xl p-1 tracking-tight"></span>
            </div>
            {/* Navigation links and sign in button */}
            <div className="flex-grow text-2xl flex items-center justify-between">
                <div className="text-lg lg:flex-grow flex text-white">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/Vehicle">Vehicles</NavLink>
                    <NavLink href="/ContactUs">Contact</NavLink>
                </div>
                <div className="flex flex-row">
                    <a
                        href="/Login"
                        className="text-lg px-4 transition duration-400 ease-out hover:ease-out py-2 mx-4 leading-none border rounded-lg text-white border-white hover:border-transparent hover:text-white hover:bg-teal-400 mt-2 lg:mt-0"
                    >
                        <div className="flex flex-row py-1 ">
                            <ManageAccounts style={{ height: '20px', paddingRight: '1px' }} />
                            Login
                        </div>
                    </a>
                </div>
            </div>

            {/* Mobile menu button */}
            <div className="block lg:hidden">
                {/* Insert mobile menu button here */}
            </div>
        </nav>
    );
};

export default NavBar;
