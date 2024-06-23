import React from 'react';
import IoTButton from './IoTButton'; // Adjust the import path based on your directory structure

const BikeList = ({ bikeData, handleButtonClick, selectedBikeId, toggleShowAllData }) => {
    return (
        <div className="p-4 shadow-md rounded-md">
           
            <div className="space-y-2">
            <h3 className="text-lg text-black font-bold mb-4">Available Bikes</h3>
                {bikeData.map((bike) => (
                    <div key={bike.bikeid} className="flex items-center space-x-2">
                        <IoTButton
                            bikeId={bike.bikeid}
                            handleButtonClick={handleButtonClick}
                            selected={selectedBikeId === bike.bikeid}
                        />
                        <button
                            onClick={toggleShowAllData}
                            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                        >
                            View All Data
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BikeList;
