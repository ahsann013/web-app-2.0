import React from 'react';
import DashboardContainer from '@/components/DashboardContainer';
import StatsCard from '../components/StatsCard';
import Chart from '../components/Chart';


const apiUrl = process.env.API_URL;

const fetchTotalRevenue = async () => {
  const response = await fetch(`${apiUrl}/revenue`);
  const data = await response.json();
  return data.total_revenue;
};

const fetchBikeStats = async () => {
  const response = await fetch(`${apiUrl}/bike-stats`);
  const data = await response.json();
  return data;
};

const DashHome = () => {
  return (
    <DashboardContainer>
      <div className="min-h-screen">
        <div className="p-4">
          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            <StatsCard title="Total Revenue" fetchData={fetchTotalRevenue} />
            <StatsCard title="Available Bikes" fetchData={async () => (await fetchBikeStats()).available_bikes} />
            <StatsCard title="Rented Bikes" fetchData={async () => (await fetchBikeStats()).rented_bikes} />
            <StatsCard title="Total Bikes" fetchData={async () => (await fetchBikeStats()).total_bikes} />
          </div>

          <div className="md:grid-cols-2 gap-4 my-4">
            <div className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-bold mb-2">Revenue Over Time</h2>
              <Chart type="bar" dataUrl={`${apiUrl}/revenue`} />
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default DashHome;
