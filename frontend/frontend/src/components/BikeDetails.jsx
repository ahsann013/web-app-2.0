import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BikeDataGraph from './BikeDataGraph';
import CustomButton from './CustomButton';

const BikeDetails = ({ selectedBikeData }) => {
    const apiUrl = process.env.API_URL;
    const [graphData, setGraphData] = useState({
        speed: [],
        voltage: [],
        current: [],
        soc: [],
        labels: [],
    });
    const [viewAllData, setViewAllData] = useState(false);

    useEffect(() => {
        const fetchGraphData = async () => {
            if (selectedBikeData) {
                try {
                    const response = await axios.get(`${apiUrl}/graphbikedata/${selectedBikeData.bikeid}`);
                    const data = response.data.data;

                    const speed = data.map((item) => item.speed);
                    const voltage = data.map((item) => item.voltage);
                    const current = data.map((item) => item.current);
                    const soc = data.map((item) => item.soc);
                    const labels = data.map((item) => new Date(item.timerecorded));

                    setGraphData({ speed, voltage, current, soc, labels });
                } catch (error) {
                    console.error('Error fetching graph data:', error);
                }
            }
        };

        fetchGraphData();
    }, [selectedBikeData]);

    const toggleViewAllData = () => {
        setViewAllData(!viewAllData);
    };

    return (
        <div className="w-full md:w-3/4 lg:w-2/3">
            {selectedBikeData && (
                <div className="shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <h2 className="text-2xl text-b font-semibold">Selected Bike Data</h2>
                    </div>

                    {/* Graphs */}
                    {!viewAllData && (
                        <div>
                            <h3 className="text-xl mb-3">Graphs</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <BikeDataGraph
                                        labels={graphData.labels}
                                        data={graphData.speed}
                                        title="Speed"
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <BikeDataGraph
                                        labels={graphData.labels}
                                        data={graphData.voltage}
                                        title="Voltage"
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <BikeDataGraph
                                        labels={graphData.labels}
                                        data={graphData.current}
                                        title="Current"
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <BikeDataGraph
                                        labels={graphData.labels}
                                        data={graphData.soc}
                                        title="State of Charge (SOC)"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* View All Data Button */}
                    <CustomButton onClick={toggleViewAllData} selected={viewAllData}>
                        {viewAllData ? "Hide All Data" : "View All Data"}
                    </CustomButton>

                    {/* Detailed data */}
                    {viewAllData && (
                        <div>
                            <h3 className="text-xl mt-4 mb-3">Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(selectedBikeData).map(([key, value]) => (
                                    <div key={key} className="bg-white p-4 rounded-lg shadow-md">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">{key}:</span> {value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BikeDetails;
