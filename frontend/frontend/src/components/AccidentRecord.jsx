// AccidentRecord.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DashboardContainer from './DashboardContainer';

const AccidentRecord = () => {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    fetchAccidents();
  }, []);

  const fetchAccidents = async () => {
    try {
      const response = await axios.get('http://20.244.46.184:3000/api/accidents');
      setAccidents(response.data);
    } catch (error) {
      console.error('Error fetching accident records:', error);
    }
  };

  return (
    <DashboardContainer>
    <div className="m-4">
      <h2 className="text-2xl font-bold mb-4">Accident Records</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bike ID</TableCell>
              <TableCell>Time Recorded</TableCell>
              <TableCell>Trip ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Departure Time</TableCell>
            
         
            </TableRow>
          </TableHead>
          <TableBody>
            {accidents.map((accident, index) => (
              <TableRow key={index}>
                <TableCell>{accident.bikeid}</TableCell>
                <TableCell>{new Date(accident.timerecorded).toLocaleString()}</TableCell>
                <TableCell>{accident.tripid}</TableCell>
                <TableCell>{`${accident.firstname} ${accident.lastname}`}</TableCell>
                <TableCell>{accident.email}</TableCell>
                <TableCell>{accident.phonenumber}</TableCell>
                <TableCell>{new Date(accident.departuretime).toLocaleString()}</TableCell>
             
               
            
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
