import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DashboardContainer from './DashboardContainer';
import SearchBar from './Searchbar'; // Import the SearchBar component

const TripHistory = () => {
  const [tripHistory, setTripHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const api_url = process.env.API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api_url}/triphistory`);
        setTripHistory(response.data);
      } catch (error) {
        console.error('Error fetching trip history data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredTripHistory = tripHistory.filter((trip) =>
    trip.tripid.toString().includes(searchQuery)
  );

  return (
    <DashboardContainer>
      <div className="trip-history">
       <div className='bg-white flex justify-center items-center m-2 pt-4 rounded-md '>
        <h1 className='flex text-4xl pb-3 justify-center font-bold'>Trip History</h1>
        <SearchBar onSearch={handleSearch} />
        </div> {/* Add SearchBar component */}
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
              {filteredTripHistory.map(trip => (
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
