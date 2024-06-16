import React from 'react';
import DashboardContainer from '@/components/DashboardContainer';
import StatsCard from '../components/StatsCard';
import Chart from '../components/Chart';
import NotificationComponent from '@/components/NotificationPanel';
const apiUrl = 'http://20.244.46.184:3000/api';

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
    <div className="bg-gray-100 min-h-screen">
 
      <div className="p-4">
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <StatsCard title="Total Revenue" fetchData={fetchTotalRevenue} />
          <StatsCard title="Available Bikes" fetchData={async () => (await fetchBikeStats()).available_bikes} />
          <StatsCard title="Rented Bikes" fetchData={async () => (await fetchBikeStats()).rented_bikes} />
          <StatsCard title="Total Bikes" fetchData={async () => (await fetchBikeStats()).total_bikes} />
        </div>
        <div className="mt-4">
          <Chart />
        </div>
      </div>
    </div>
    <NotificationComponent/>
  </DashboardContainer>
  );
};

export default DashHome;
