// BikeDetails.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Paper, Grid } from '@mui/material';
import BikeDataGraph from './BikeDataGraph';
import CustomButton from './CustomButton';

const BikeDetails = ({ selectedBikeData }) => {
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
                    const response = await axios.get(`http://20.244.46.184:3000/api/graphbikedata/${selectedBikeData.bikeid}`);
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
        <Grid item xs={9}>
            {selectedBikeData && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Selected Bike Data
                        </Typography>

                        {/* Graphs */}
                        {!viewAllData && (
                            <div className=''>
                                <Typography variant="h6">Graphs</Typography>
                                <div className="graph-container grid grid-cols-2 gap-3">
                                    <Paper elevation={3} className="graph">
                                        <BikeDataGraph
                                            labels={graphData.labels}
                                            data={graphData.speed}
                                            title="Speed"
                                        />
                                    </Paper>
                                    <Paper elevation={3} className="graph">
                                        <BikeDataGraph
                                            labels={graphData.labels}
                                            data={graphData.voltage}
                                            title="Voltage"
                                        />
                                    </Paper>
                                    <Paper elevation={3} className="graph">
                                        <BikeDataGraph
                                            labels={graphData.labels}
                                            data={graphData.current}
                                            title="Current"
                                        />
                                    </Paper>
                                    <Paper elevation={3} className="graph">
                                        <BikeDataGraph
                                            labels={graphData.labels}
                                            data={graphData.soc}
                                            title="State of Charge (SOC)"
                                        />
                                    </Paper>
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
                                <Typography variant="h6">Details</Typography>
                                <Grid container spacing={1}>
                                    {Object.entries(selectedBikeData).map(([key, value]) => (
                                        <Grid item xs={6} key={key}>
                                            <Paper elevation={3} className="p-2">
                                                <Typography variant="body2" color="textSecondary">
                                                    {key}: {value}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </Grid>
    );
};

export default BikeDetails;
