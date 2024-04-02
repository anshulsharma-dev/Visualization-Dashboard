import React from 'react';
import { Bar } from 'react-chartjs-2';
import { processDataForLikelihoodChart } from '../utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LikelihoodChart = ({ data }) => {
  const chartData = processDataForLikelihoodChart(data);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sector',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Likelihood',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LikelihoodChart;
