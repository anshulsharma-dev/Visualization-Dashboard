import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { processDataForLineChart } from "../utils";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  PointElement,
  LineElement
);

const LineChart = ({ data }) => {
  const [selectedSector, setSelectedSector] = useState("All");
  const [chartData, setChartData] = useState({ datasets: [] });
  const sectors = [
    "All",
    ...new Set(data.map((item) => item.sector).filter(Boolean)),
  ];
  
  useEffect(() => {
    const newChartData = processDataForLineChart(data, selectedSector);
    setChartData(newChartData);
  }, [data, selectedSector]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
        },
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Intensity",
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      <select
        style={{ position: 'absolute', right: '10px', top: '10px', zIndex: 1000 }}
        value={selectedSector}
        onChange={(e) => setSelectedSector(e.target.value)}
      >
        {sectors.map(sector => (
          <option key={sector} value={sector}>{sector}</option>
        ))}
      </select>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
