import React from 'react';

const CarImage = () => {
  return (
    <div className="flex justify-center items-center h-80 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-cl">
      <img src='./public/bike-logo.svg' alt="carimage" className="h-80 w-80 rounded-full  bg-gradient-to-br from-amber-600 to-amber-500 border-4 border-white " />
    </div>
  );
};

export default CarImage;
