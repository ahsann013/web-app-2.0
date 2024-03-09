import React from 'react';

const Vehicle = () => {
    // Sample data for vehicles
    const vehicles = [
        { id: 1, name: 'Car A', type: 'Sedan', price: '$30,000' },
        { id: 2, name: 'Car B', type: 'SUV', price: '$40,000' },
        { id: 3, name: 'Bike A', type: 'Motorcycle', price: '$10,000' },
        // Add more vehicles as needed
    ];

    return (
        <div className="vehicle-page m-12">
            <h2 className="text-3xl font-bold mb-8">Our Vehicles</h2>
            <div className="flex flex-col md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-white p-6  rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                        <p className="text-gray-600 mb-2">{vehicle.type}</p>
                        <p className="text-teal-500 font-bold">{vehicle.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vehicle;
