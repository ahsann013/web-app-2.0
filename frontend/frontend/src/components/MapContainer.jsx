import React, { useEffect, useRef } from 'react';
import * as atlas from 'azure-maps-control';
import 'azure-maps-control/dist/atlas.min.css';

const MapContainer = ({ subscriptionKey, stations }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        let map;

        const loadMap = () => {
            map = new atlas.Map(
                mapRef.current,
                {
                    authOptions: {
                        authType: atlas.AuthenticationType.subscriptionKey,
                        subscriptionKey: subscriptionKey,
                    },
                    center: [0, 0],
                    zoom: 10,
                    view: 'Auto',
                }
            );

            map.events.add('ready', () => {
                stations.forEach((station) => {
                    const marker = new atlas.HtmlMarker({
                        color: 'DodgerBlue',
                        text: station.name,
                        position: station.position,
                    });

                    map.markers.add(marker);
                });
            });


      
        };

  
   loadMap();
    
   
    }, [subscriptionKey, stations]);
  
    return <div ref={mapRef} className='h-full w-full'>AzureMaps</div>;
};

export default MapContainer;
