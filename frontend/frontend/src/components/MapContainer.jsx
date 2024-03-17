import React from 'react'

import { APIProvider, InfoWindow, Pin, Map } from '@vis.gl/react-google-maps'
import DashboardContainer from './DashboardContainer'
const MapContainer = () => {
    const position = { lat: 37.7749, lng: -122.4194 }
    const apikey = import.meta.env.REACT_APP_GOOGLE_API_KEY
    return (
        <DashboardContainer>
            <APIProvider apiKey={apikey}>

                <Map zoom={9} center={position} ></Map>

            </APIProvider>
        </DashboardContainer>

    )
}

export default MapContainer;