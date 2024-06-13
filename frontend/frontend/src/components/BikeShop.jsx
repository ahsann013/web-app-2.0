import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Paper, Grid, Button } from '@mui/material';
import DashboardContainer from './DashboardContainer';

const BikeShop = () => {
    const [bikeData, setBikeData] = useState([]);
    const [selectedBikeId, setSelectedBikeId] = useState(null);
    const [selectedBikeData, setSelectedBikeData] = useState(null);

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

    const handleButtonClick = (bikeid) => {
        setSelectedBikeId(bikeid);
        setSelectedBikeData(bikeData.find((bike) => bike.bikeid === bikeid));
    };

    return (
    
        <Grid container spacing={2}>
            {/* Left Side: Buttons for bike selection */}
            <Grid item xs={3}>
                <Paper elevation={3} className="p-4">
                    <Typography variant="h6" gutterBottom>
                        Available Bikes
                    </Typography>
                    <div className="space-y-2">
                        {bikeData.map((bike) => (
                            <Button
                                key={bike.bikeid}
                                onClick={() => handleButtonClick(bike.bikeid)}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                    },
                                    ...(selectedBikeId === bike.bikeid && {
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                    }),
                                }}
                            >
                                {bike.bikeid}
                            </Button>
                        ))}
                    </div>
                </Paper>
            </Grid>
            
            {/* Right Side: Display selected bike data */}
            <Grid item xs={9}>
                {selectedBikeData && (
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Selected Bike Data
                            </Typography>
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
                        </CardContent>
                    </Card>
                )}
            </Grid>
        </Grid>
       
    );
};

export default BikeShop;
