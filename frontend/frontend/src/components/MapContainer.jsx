import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import './Map.css';
import DashboardContainer from "./DashboardContainer";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWhzYW4xODI4IiwiYSI6ImNsdmt3anRvaTBwcWkybXBwZ2VrdWdrbTQifQ.AjNjX5ywz7MkS_GSVB2mhg";

const MapContainer = () => {
  const mapContainerRef = useRef(null);
  const [zoom, setZoom] = useState(14);
  const [renderTime, setRenderTime] = useState(new Date());
  const [latestLocation, setLatestLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const apiUrl = process.env.API_URL;  // Adjust this as needed

  useEffect(() => {
    const fetchLatestLocation = async () => {
      try {
        const response = await axios.get(`${apiUrl}/latestBikeLocation`);
        if (response.data.success && response.data.data.length > 0) {
          setLatestLocation(response.data.data[0]); // Assuming you want the first bike's latest location
        }
      } catch (error) {
        console.error('Error fetching latest bike location:', error);
      }
    };

    fetchLatestLocation();
  }, [apiUrl, renderTime]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stations`);
        setStations(response.data); // Assuming response.data is an array of stations
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, [apiUrl, renderTime]);

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v10",
        center: [74.19749267, 31.405639],
        zoom: zoom,
      });

      // Save the zoom level when it changes
      map.on('zoomend', () => {
        setZoom(map.getZoom());
      });

      // Custom marker for bikes
      const customMarkerBike = document.createElement('div');
      customMarkerBike.className = 'custom-marker';
      customMarkerBike.style.backgroundImage = 'url(../public/bycicle.png)';
      customMarkerBike.style.width = '30px';
      customMarkerBike.style.height = '30px';
      customMarkerBike.style.backgroundSize = 'contain';

      // Check if latestLocation is available before creating bike marker
      if (latestLocation) {
        const markerBike = new mapboxgl.Marker({ element: customMarkerBike })
          .setLngLat([latestLocation.longitude, latestLocation.latitude])
          .addTo(map);
      }

      // Create markers for stations
      stations.forEach(station => {
        const customMarkerStation = document.createElement('div');
        customMarkerStation.className = 'custom-marker';
        customMarkerStation.style.backgroundImage = 'url(../public/stations.png)';
        customMarkerStation.style.width = '29px';
        customMarkerStation.style.height = '27px';
        customMarkerStation.style.backgroundSize = 'contain';

        new mapboxgl.Marker({ element: customMarkerStation })
          .setLngLat([station.longitude, station.latitude])
          .addTo(map);
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      return () => map.remove();
    };

    initializeMap();
    const interval = setInterval(() => {
      setRenderTime(new Date()); // Refresh map periodically
    }, 6000);

    return () => clearInterval(interval);
  }, [renderTime, latestLocation, stations, zoom]);

  return (
    <DashboardContainer>
      <div className="">
        <h1 className='flex text-4xl pb-3 justify-center font-bold'>Live Tracking</h1>
        <div className="mapbox" ref={mapContainerRef} />
      </div>
    </DashboardContainer>
  );
};

export default MapContainer;
