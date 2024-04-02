import React from "react";
import { Bar } from "react-chartjs-2";
import { processDataForBarChart } from "../utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const chartData = processDataForBarChart(data);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: 'logarithmic',
        grid: {
          display: true,
        },
        ticks: {
          callback: function (value) {
            if (value === 10 || value === 100 || value === 1000 || value === 10000) {
              return value.toString();
            } else if (value > 10000) {
              return Number.parseFloat(value).toExponential(0);
            }
            return null;
          },
          color: 'black',
          font: {
            size: 12,
          },
          autoSkip: true,
          maxRotation: 0,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'black',
          font: {
            size: 12,
          },
        },
      },
    },
  };
  
  
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
