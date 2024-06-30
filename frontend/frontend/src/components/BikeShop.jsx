import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BikeDetails from './BikeDetails';
import IoTButton from './TurnoffButton';

const BikeShop = () => {
    const apiUrl = process.env.API_URL;
    const [bikeData, setBikeData] = useState([]);
    const [selectedBikeId, setSelectedBikeId] = useState(null);
    const [selectedBikeData, setSelectedBikeData] = useState(null);
    const [showAllData, setShowAllData] = useState(false);
    const [detailedBikeData, setDetailedBikeData] = useState([]);
    const [newBike, setNewBike] = useState({ bikeid: '', availabilityStatus: true, currentStation: '' });

    useEffect(() => {
        const fetchBikeData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/last-bike-data`);
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
                    const response = await axios.get(`${apiUrl}/last-bike-data/${selectedBikeId}`);
                    setDetailedBikeData(response.data); // Assuming response.data contains detailed bike data
                } catch (error) {
                    console.error('Error fetching detailed bike data:', error);
                }
            }
        };

        fetchDetailedBikeData();
    }, [selectedBikeId, showAllData]);

    const handleButtonClick = (bikeid) => {
        if (selectedBikeId === bikeid) {
            // If the clicked bike is already selected, deselect it
            setSelectedBikeId(null);
            setSelectedBikeData(null);
            setShowAllData(false);
            setDetailedBikeData([]);
        } else {
            // Otherwise, select the clicked bike
            setSelectedBikeId(bikeid);
            setSelectedBikeData(bikeData.find((bike) => bike.bikeid === bikeid));
            setShowAllData(false); // Reset showAllData when selecting a new bike
            setDetailedBikeData([]); // Clear detailedBikeData when selecting a new bike
        }
    };

    const toggleShowAllData = () => {
        setShowAllData(fetchDetailedBikeData());
    };

    const handlePublish = async (bikeid) => {
        const apiEndpoint = `${apiUrl}/publish-message`;
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

    const handleAddBike = async () => {
        const apiEndpoint = `${apiUrl}/api/bikes`;

        try {
            const response = await axios.post(apiEndpoint, {
                bikePlateNumber: newBike.bikeid,
                availabilityStatus: newBike.availabilityStatus,
                currentStation: newBike.currentStation,
            });
            console.log(response.data); // Log the response from the backend
            alert('Bike added successfully');
            setBikeData([...bikeData, newBike]); // Update local state
            setNewBike({ bikeid: '', availabilityStatus: true, currentStation: '' }); // Reset new bike fields
        } catch (error) {
            console.error('Error adding bike:', error);
            alert('Failed to add bike');
        }
    };

    const handleDeleteBike = async () => {
        if (!selectedBikeId) return;
        const apiEndpoint = `${apiUrl}/bikes/${selectedBikeId}`;

        try {
            const response = await axios.delete(apiEndpoint);
            console.log(response.data); // Log the response from the backend
            alert('Bike deleted successfully');
            setBikeData(bikeData.filter(bike => bike.bikeid !== selectedBikeId)); // Update local state
            setSelectedBikeId(null);
            setSelectedBikeData(null);
        } catch (error) {
            console.error('Error deleting bike:', error);
            alert('Failed to delete bike');
        }
    };

    return (
        <>
            <h1 className='flex text-4xl pb-3 justify-center font-bold'>E-Bike Health Monitoring</h1>   

            <div className="grid grid-cols-4 gap-4 ">
                {/* Left Side: Buttons for bike selection */}
                <div className="col-span-1 p-4 shadow-md rounded-md ">
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
                    {selectedBikeId && (
                        <button
                            onClick={handleDeleteBike}
                            className="mt-4 px-4 py-2 border border-gray-300 rounded-md bg-red-500 text-white hover:bg-red-700"
                        >
                            Delete Bike
                        </button>
                    )}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-4">Add New Bike</h2>
                        <input
                            type="text"
                            placeholder="Bike Plate Number"
                            value={newBike.bikeid}
                            onChange={(e) => setNewBike({ ...newBike, bikeid: e.target.value })}
                            className="mb-2 p-2 border border-gray-300 text-black rounded-md w-full"
                        />
                        <input
                            type="text"
                            placeholder="Current Station"
                            value={newBike.currentStation}
                            onChange={(e) => setNewBike({ ...newBike, currentStation: e.target.value })}
                            className="mb-2 p-2 border border-gray-300 text-black rounded-md w-full"
                        />
                        <button
                            onClick={handleAddBike}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-green-500 text-white hover:bg-green-700"
                        >
                            Add Bike
                        </button>
                    </div>
                </div>

                {/* Right Side: Display selected bike data */}
                <div className="col-span-3 w-screen">
                    <BikeDetails
                        selectedBikeData={selectedBikeData}
                        showAllData={showAllData}
                        detailedBikeData={detailedBikeData}
                    />
               
                </div>
            </div>
        </>
    );
};

export default BikeShop;
