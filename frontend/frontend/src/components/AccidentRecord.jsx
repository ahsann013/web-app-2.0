// AccidentRecord.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DashboardContainer from './DashboardContainer';

const AccidentRecord = () => {
  const [accidents, setAccidents] = useState([]);
  const apiUrl = process.env.API_URL;  // Adjusted to REACT_APP_API_URL for Create React App

  useEffect(() => {
    fetchAccidents();
  }, []);

  const fetchAccidents = async () => {
    try {
      const response = await axios.get(`${apiUrl}/accidents`);
      setAccidents(response.data);
    } catch (error) {
      console.error('Error fetching accident records:', error);
    }
  };

  return (
    <DashboardContainer>
      <div className="m-4">
        <h1 className='flex text-4xl pb-3 justify-center font-bold'>Accident Records</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bike ID</TableCell>
                <TableCell>Time Recorded</TableCell>
                <TableCell>Longitude</TableCell>
                <TableCell>Latitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accidents.map((accident, index) => (
                <TableRow key={index}>
                  <TableCell>{accident.bikeid}</TableCell>
                  <TableCell>{new Date(accident.timerecorded).toLocaleString()}</TableCell>
                  <TableCell>{accident.longitude}</TableCell>
                  <TableCell>{accident.latitude}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </DashboardContainer>
  );
};

export default AccidentRecord;
