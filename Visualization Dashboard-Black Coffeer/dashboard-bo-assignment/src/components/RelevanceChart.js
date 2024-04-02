import React from 'react';
import { Bar } from 'react-chartjs-2';
import { processDataForRelevanceChart } from '../utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RelevanceChart = ({ data }) => {
  const chartData = processDataForRelevanceChart(data);

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
          text: 'Relevance',
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

export default RelevanceChart;
