import React from 'react';

const CustomButton = ({ onClick, children, selected }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 transform ${
                selected ? 'bg-green-500 text-white' : 'bg-white text-black'
            } hover:bg-green-500 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500`}
        >
            {children}
        </button>
    );
};

export default CustomButton;