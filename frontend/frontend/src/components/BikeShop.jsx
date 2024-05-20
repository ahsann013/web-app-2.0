import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { io } from 'socket.io-client';

const BikeShop = () => {
    const [bikeData, setBikeData] = useState([]);
    const [selectedBikeId, setSelectedBikeId] = useState(null);
    const [selectedBikeData, setSelectedBikeData] = useState({});

    useEffect(() => {
        const fetchBikeData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/last-bike-data');
                setBikeData(response.data.data);
            } catch (error) {
                console.error('Error fetching bike data:', error);
            }
        };

        fetchBikeData();

        // Initialize Socket.IO client
        const socket = io('http://127.0.0.1:3000');

        // Listen for updates from the server
        socket.on('bikedata_update', (updatedBikeData) => {
            const updatedData = JSON.parse(updatedBikeData);
            setBikeData(updatedData);
            if (selectedBikeId) {
                const updatedSelectedBike = updatedData.find(bike => bike.bikeid === selectedBikeId);
                setSelectedBikeData(updatedSelectedBike);
            }
        });

        // Cleanup the effect
        return () => {
            socket.off();
        };
    }, [selectedBikeId]);

    const handleButtonClick = (bikeid) => {
        setSelectedBikeData(bikeData.find((bike) => bike.bikeid === bikeid));
        setSelectedBikeId(bikeid);
    };

    return (
        <div className="flex-1 pt-2 md:flex-row items-center justify-center md:space-y-0 md:space-x-4">
            {/* Display selected bike data in a single card component */}
            {selectedBikeData && (
                <Card className="w-auto p-auto m-auto md:w-1/2">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Selected Bike Data
                        </Typography>
                        {/* Divide selected bike data into two columns */}
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(selectedBikeData).map(([key, value]) => (
                                <div key={key}>
                                    <Typography variant="body2">{key}: {value}</Typography>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
            {/* Display buttons for each bike ID */}
            <div className="flex pt-8 gap-4 justify-center">
                {bikeData.map((entry) => (
                    <Button
                        key={entry.bikeid}
                        onClick={() => handleButtonClick(entry.bikeid)}
                        variant={selectedBikeId === entry.bikeid ? "contained" : "outlined"}
                        className="bg-emerald-800 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-full m-2"
                    >
                        {entry.bikeid}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default BikeShop;
