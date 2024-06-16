import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const apiUrl = 'http://20.244.46.184:3000/api';

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}/bike-fleet`);
      const data = await response.json();

      const labels = [...new Set(data.map(item => item.currentstation))]; // Unique station names
      const bikeCounts = labels.map(station => data.filter(item => item.currentstation === station).length); // Count bikes at each station

      setChartData({
        labels,
        datasets: [
          {
            label: 'Number of Bikes',
            data: bikeCounts,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md m-2 h-64">
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default Chart;
