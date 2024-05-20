import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, description, linkTo, previewContent }) => {
  return (
    <Link to={linkTo} className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <div className="h-24 border-t border-gray-300 pt-4">
        {previewContent}
      </div>
    </Link>
  );
};

export default DashboardCard;
