import React from 'react'

const AzureMaps = () => {

    const stations = [
    {
        name: 'Station 1',
        position: [-12, 8],
    },
    {
        name: 'Station 2',
        position: [-43, 67],
    },
    ]

  return (
    <div>AzureMaps
        <MapContainer subscriptionKey = {process.env.REACT_APP_AZURE_MAPS_KEY}
        stations={stations}/>
    </div>
  )
}

export default AzureMaps