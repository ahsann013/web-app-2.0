import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapBoxSearch from './MapBoxSearch';


mapboxgl.accessToken = 'pk.eyJ1IjoiYWhzYW4xODI4IiwiYSI6ImNsdmt3anRvaTBwcWkybXBwZ2VrdWdrbTQifQ.AjNjX5ywz7MkS_GSVB2mhg';

export default function MapContainer() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(74.195934);
  const [lat, setLat] = useState(31.418098);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

   
    

    // Ensure map resizes on window resize
    window.addEventListener('resize', () => map.current.resize());

    return () => {
      window.removeEventListener('resize', () => map.current.resize());
    }; // Cleanup function for event listener
  }, []);

  return (
    <div className="map-wrapper"> {/* New wrapper for consistent styling */}
      <div className="sidebar p-2 mb-1 bg-amber-400 text-black  rounded-md">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container  rounded-lg" style={{ width: '100%', height: '75vh' , borderRadius: '50px'  }} /> {/* Set styles for full screen */}
    
    </div>
  );
}
