import React from 'react';

const Vehicle = () => {
    // Sample data for vehicles
    const vehicles = [
        { id: 1, name: 'Bike 1', type: 'Model', price: 'Specs' },
        { id: 2, name: 'Bike 2', type: 'Model', price: 'Specs' },
        { id: 3, name: 'Bike 3', type: ' Model', price: 'Specs' },
        // Add more vehicles as needed
    ];

    return (
        <div className=" bg-black p-6 ">
            <h2 className="text-3xl font-bold  ">Our Vehicles</h2>
            <div className="flex flex-col md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-white p-9  rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2 text-black">{vehicle.name}</h3>
                        <p className="text-gray-600 mb-2">{vehicle.type}</p>
                        <p className="text-amber-500 font-bold">{vehicle.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vehicle;
