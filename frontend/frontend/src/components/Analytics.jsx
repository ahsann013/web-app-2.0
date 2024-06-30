import React, { useState } from 'react';
import axios from 'axios';
import BikeDataGraph from './BikeDataGraph';
import { Input, Button, message } from 'antd';
import DashboardContainer from './DashboardContainer';

const Analytics = () => {
  const [tripId, setTripId] = useState('');
  const [tripData, setTripData] = useState([]);
  const apiUrl = process.env.API_URL; // Adjust this as needed

  const fetchTripData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/databytrip`, { params: { tripId } });
      if (response.data.success) {
        setTripData(response.data.data);
      } else {
        message.error('Failed to fetch trip data');
      }
    } catch (error) {
      console.error('Error fetching trip data:', error);
      message.error('Error fetching trip data');
    }
  };

  const handleTripIdChange = (e) => {
    setTripId(e.target.value);
  };

  const handleFetchData = () => {
    if (tripId) {
      fetchTripData();
    } else {
      message.warning('Please enter a Trip ID');
    }
  };

  const extractGraphData = (data, key) => data.map((item) => item[key]);
  const extractLabels = (data) => data.map((item) => new Date(item.timerecorded).toLocaleString());

  const graphData = {
    speed: extractGraphData(tripData, 'speed'),
    voltage: extractGraphData(tripData, 'voltage'),
    current: extractGraphData(tripData, 'current'),
    soc: extractGraphData(tripData, 'soc'),
    batterytemperature: extractGraphData(tripData, 'batterytemperature'),
    controller_temp: extractGraphData(tripData, 'controller_temp'),
    labels: extractLabels(tripData),
  };

  const containerStyle = {
    padding: '20px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginTop: '20px',
  };

  const inputStyle = {
    width: '200px',
    marginRight: '10px',
  };

  return (
    <DashboardContainer>
      <div className="p-3">
        <h2 className="text-2xl font-bold mb-4">Trip Data Charts</h2>
        <div className="flex items-center mb-4">
         ENTER TRIP ID:
          <Input
            placeholder="Trip ID"
            value={tripId}
            onChange={handleTripIdChange}
            className="mr-2 w-48 p-2 border rounded"
          />
          <Button type="primary" onClick={handleFetchData}>
            Show Trip Data
          </Button>
        </div>

        {tripData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <BikeDataGraph
                labels={graphData.labels}
                data={graphData.speed}
                title="Speed"
                tickCount={3} // Control the number of ticks on the x-axis
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <BikeDataGraph
                labels={graphData.labels}
                data={graphData.soc}
                title="State of Charge (SOC)"
                tickCount={3} // Control the number of ticks on the x-axis
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <BikeDataGraph
                labels={graphData.labels}
                data={graphData.controller_temp}
                title="Controller Temperature"
                tickCount={3} // Control the number of ticks on the x-axis
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <BikeDataGraph
                labels={graphData.labels}
                data={graphData.voltage}
                title="Voltage"
                tickCount={3} // Control the number of ticks on the x-axis
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <BikeDataGraph
                labels={graphData.labels}
                data={graphData.current}
                title="Current"
                tickCount={3} // Control the number of ticks on the x-axis
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <BikeDataGraph
                labels={graphData.labels}
                data={graphData.batterytemperature}
                title="Battery Temperature"
                tickCount={3} // Control the number of ticks on the x-axis
              />
            </div>
          </div>
        )}
      </div>
    </DashboardContainer>
  );
};

export default Analytics;
