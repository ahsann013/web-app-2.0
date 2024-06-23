import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const IoTButton = ({ bikeId, onClick, selected }) => {
    const handleButtonClick = async () => {
        try {
            await onClick(bikeId); // Call the onClick function passed from BikeShop with bikeId
        } catch (error) {
            console.error('Error publishing message:', error);
            alert('Failed to publish message to AWS IoT Core');
        }
    };

    return (
        <button
            onClick={handleButtonClick}
            className={`px-2 py-2 rounded-md transition duration-200 transform ${
                selected ? 'bg-blue-900 text-white hover:bg-blue-700' : 'bg-white text-black hover:bg-blue-900 hover:text-white'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
            Off
        </button>
    );
};

IoTButton.propTypes = {
    bikeId: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};

export default IoTButton;
