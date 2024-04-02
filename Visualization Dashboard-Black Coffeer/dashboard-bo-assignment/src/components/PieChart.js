import React from 'react';
import { Pie } from 'react-chartjs-2';
import { processDataForPieChart } from '../utils';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${(i * 360) / count}, 100%, 50%)`);
  }
  return colors;
};

const LegendComponent = ({ chartData }) => {
  return (
    <div style={{ width: '50%', display: 'flex', flexDirection: 'column', paddingRight: '1rem', maxHeight: '400px', flexWrap: 'wrap', overflowY: 'auto' }}>
      {chartData.labels.map((label, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <span style={{
            display: 'inline-block',
            width: '14px',
            height: '14px',
            marginRight: '8px',
            backgroundColor: chartData.datasets[0].backgroundColor[index]
          }}></span>
          <span style={{ fontSize: '12px', lineHeight: '14px' }}>{label}</span>
        </div>
      ))}
    </div>
  );
};

const PieChart = ({ data }) => {
  const chartData = processDataForPieChart(data);
  chartData.datasets[0].backgroundColor = generateColors(chartData.labels.length);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <LegendComponent chartData={chartData} />
      <div style={{ width: '50%', height: '400px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
