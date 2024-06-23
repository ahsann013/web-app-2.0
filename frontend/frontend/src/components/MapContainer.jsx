import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import geoJson from "./estations.json";
import './Map.css';
import DashboardContainer from "./DashboardContainer";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWhzYW4xODI4IiwiYSI6ImNsdmt3anRvaTBwcWkybXBwZ2VrdWdrbTQifQ.AjNjX5ywz7MkS_GSVB2mhg";

const MapContainer = () => {
  const mapContainerRef = useRef(null);
  const [zoom, setZoom] = useState(11);
  const [renderTime, setRenderTime] = useState(new Date());


  useEffect(() => {

    // Function to initialize map
    const initializeMap = () => {
      const img_url = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png';
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v10",
        center: [74.3, 31.4605],
        zoom: zoom,
      });


      const customMarkerElement = document.createElement('div');
      customMarkerElement.className = 'custom-marker';
      customMarkerElement.style.backgroundImage = 'url(../public/bycicle.png)';
      customMarkerElement.style.width = '30px';
      customMarkerElement.style.height = '30px';
      customMarkerElement.style.backgroundSize = 'contain'; // Scale image to fit within 50x50px


      const marker2 = new mapboxgl.Marker({ element: customMarkerElement })
        .setLngLat([74.32190117, 31.48020183])
        .addTo(map);



      const customMarkerElement1 = document.createElement('div');
      customMarkerElement1.className = 'custom-marker';
      customMarkerElement1.style.backgroundImage = 'url(../public/bycicle.png)';
      customMarkerElement1.style.width = '30px';
      customMarkerElement1.style.height = '30px';
      customMarkerElement1.style.backgroundSize = 'contain'; // Scale image to fit within 50x50px


      const marker3 = new mapboxgl.Marker({ element: customMarkerElement1 })
        .setLngLat([74.32190117, 31.78020183])
        .addTo(map);

      const marker1 = new mapboxgl.Marker()
        .setLngLat([73.22190117, 31.58020183])
        .addTo(map);


      // Create default markers
      geoJson.features.map((feature) =>
        new mapboxgl.Marker()
          .setLngLat(feature.geometry.coordinates)
          .addTo(map)
      );

      // Add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      // Clean up on unmount
      return () => map.remove();
    };

    // Log the time when useEffect is called
    console.log("useEffect called at:", renderTime);

    // Call the initializeMap function immediately
    initializeMap();

    // Set up an interval to call initializeMap every 60 seconds
    const interval = setInterval(initializeMap, 60000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [renderTime]); // Include renderTime in the dependency array

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
