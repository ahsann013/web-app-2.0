import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BikeDetails from './BikeDetails';
import IoTButton from './TurnoffButton';

const BikeShop = () => {
    const [bikeData, setBikeData] = useState([]);
    const [selectedBikeId, setSelectedBikeId] = useState(null);
    const [selectedBikeData, setSelectedBikeData] = useState(null);
    const [showAllData, setShowAllData] = useState(false);
    const [detailedBikeData, setDetailedBikeData] = useState([]);

    useEffect(() => {
        const fetchBikeData = async () => {
            try {
                const response = await axios.get('http://20.244.46.184:3000/api/last-bike-data');
                setBikeData(response.data.data);
            } catch (error) {
                console.error('Error fetching bike data:', error);
            }
        };

        fetchBikeData();
    }, []);

    useEffect(() => {
        const fetchDetailedBikeData = async () => {
            if (selectedBikeId && showAllData) {
                try {
                    const response = await axios.get(`http://20.244.46.184:3000/api/last-bike-data/${selectedBikeId}`);
                    setDetailedBikeData(response.data); // Assuming response.data contains detailed bike data
                } catch (error) {
                    console.error('Error fetching detailed bike data:', error);
                }
            }
        };

        fetchDetailedBikeData();
    }, [selectedBikeId, showAllData]);

    const handleButtonClick = (bikeid) => {
        setSelectedBikeId(bikeid);
        setSelectedBikeData(bikeData.find((bike) => bike.bikeid === bikeid));
        setShowAllData(false); // Reset showAllData when selecting a new bike
        setDetailedBikeData([]); // Clear detailedBikeData when selecting a new bike
    };

    const toggleShowAllData = () => {
        setShowAllData(!showAllData);
    };

    const handlePublish = async (bikeid) => {
        const apiEndpoint = 'http://20.244.46.184:3000/api/publish-message';
        const payload = { BikeID: bikeid };

        try {
            const response = await axios.post(apiEndpoint, payload);
            console.log(response.data); // Log the response from the backend
            alert('Message published successfully to AWS IoT Core');
        } catch (error) {
            console.error('Error publishing message:', error);
            alert('Failed to publish message to AWS IoT Core');
        }
    };

    return (
        <div className="grid grid-cols-4 gap-4">
            {/* Left Side: Buttons for bike selection */}
            <div className="col-span-1">
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-lg font-semibold mb-4">Available Bikes</h2>
                    <div className="space-y-2">
                        {bikeData.map((bike) => (
                            <div key={bike.bikeid} className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleButtonClick(bike.bikeid)}
                                    className={`w-full px-4 py-2 border border-gray-300 rounded-md transition duration-200 ${
                                        selectedBikeId === bike.bikeid
                                            ? 'bg-blue-900 text-white hover:bg-blue-700'
                                            : 'bg-white text-black hover:bg-blue-900 hover:text-white'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                >
                                    {bike.bikeid}
                                </button>
                                {selectedBikeId === bike.bikeid && (
                                    <IoTButton
                                        bikeId={bike.bikeid}
                                        onClick={() => handlePublish(bike.bikeid)}
                                        selected={selectedBikeId === bike.bikeid}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Display selected bike data */}
            <div className="col-span-3">
                <BikeDetails
                    selectedBikeData={selectedBikeData}
                    showAllData={showAllData}
                    detailedBikeData={detailedBikeData}
                />
            </div>
        </div>
    );
};

export default BikeShop;
