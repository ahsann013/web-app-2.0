import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

const MapComponent = () => {
  const [stations, setStations] = useState([]);
const apiUrl = process.env.API_URL;
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/stations`); // Adjust URL if necessary
        setStations(response.data); // Assuming response.data is an array of stations
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    // Your Mapbox map initialization code here, using 'stations' state data
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWhzYW4xODI4IiwiYSI6ImNsdmt3anRvaTBwcWkybXBwZ2VrdWdrbTQifQ.AjNjX5ywz7MkS_GSVB2mhg';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
    });

    // Example: Add markers for each station
    stations.forEach(station => {
      new mapboxgl.Marker()
        .setLngLat([station.longitude, station.latitude])
        .addTo(map);
    });

    // Cleanup function for map
    return () => map.remove();

  }, [stations]); // Re-run effect when 'stations' state changes

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default MapComponent;
