import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DashboardContainer from './DashboardContainer';
import { Paperclip } from 'lucide-react';
const TripHistory = () => {
  const [tripHistory, setTripHistory] = useState([]);

  useEffect(() => {
    // Fetch trip history data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://20.244.46.184:3000/api/triphistory');
        setTripHistory(response.data);
      } catch (error) {
        console.error('Error fetching trip history data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContainer>
    <div className="trip-history">
     
      <TableContainer className='h-screen-1 m-auto p-auto' component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trip ID</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Bike ID</TableCell>
              <TableCell>Fare</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Duration of Travel (min)</TableCell>
              <TableCell>Distance Travelled (km)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tripHistory.map(trip => (
              <TableRow key={trip.tripid}>
                <TableCell>{trip.tripid}</TableCell>
                <TableCell>{trip.customerid}</TableCell>
                <TableCell>{trip.bikeid}</TableCell>
                <TableCell>{trip.fare}</TableCell>
                <TableCell>{new Date(trip.departuretime).toLocaleString()}</TableCell>
                <TableCell>{new Date(trip.arrivaltime).toLocaleString()}</TableCell>
                <TableCell>{trip.durationoftravel}</TableCell>
                <TableCell>{trip.distancetravelled}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
   </DashboardContainer>
  );
};

export default TripHistory;
