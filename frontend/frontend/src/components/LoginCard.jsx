import React from 'react';

const CardComponent = ({ title, value }) => {
  return (
    <div className="bg-black p-6 shadow-md rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{value}</p>
    </div>
  );
};

export default CardComponent;
