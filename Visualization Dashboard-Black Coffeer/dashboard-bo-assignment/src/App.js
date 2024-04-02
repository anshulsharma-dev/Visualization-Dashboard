import React, { useState } from 'react';
import './App.css';
import jsonData from './jsondata.json';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import LikelihoodChart from './components/LikelihoodChart';
import FilterComponent from './components/FilterComponent';
import RelevanceChart from './components/RelevanceChart';

const App = () => {
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedPestle, setSelectedPestle] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');

  const getUniqueOptions = (key) => {
    return ['All', ...new Set(jsonData.map(item => item[key]).filter(Boolean))];
  };

  const getFilteredData = () => {
    return jsonData.filter(item => {
      return (selectedSector === 'All' || item.sector === selectedSector) &&
             (selectedTopic === 'All' || item.topic === selectedTopic) &&
             (selectedRegion === 'All' || item.region === selectedRegion) &&
             (selectedCountry === 'All' || item.country === selectedCountry) &&
             (selectedPestle === 'All' || item.pestle === selectedPestle) &&
             (selectedSource === 'All' || item.source === selectedSource);
    });
  };

  const filteredData = getFilteredData();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <main className="dashboard-main">
        <div className="filter-container">
          <FilterComponent
            label="Sector"
            options={getUniqueOptions('sector')}
            selected={selectedSector}
            setSelected={setSelectedSector}
          />
          <FilterComponent
            label="Topic"
            options={getUniqueOptions('topic')}
            selected={selectedTopic}
            setSelected={setSelectedTopic}
          />
          <FilterComponent
            label="Region"
            options={getUniqueOptions('region')}
            selected={selectedRegion}
            setSelected={setSelectedRegion}
          />
          <FilterComponent
            label="Country"
            options={getUniqueOptions('country')}
            selected={selectedCountry}
            setSelected={setSelectedCountry}
          />
          <FilterComponent
            label="Pestle"
            options={getUniqueOptions('pestle')}
            selected={selectedPestle}
            setSelected={setSelectedPestle}
          />
          <FilterComponent
            label="Source"
            options={getUniqueOptions('source')}
            selected={selectedSource}
            setSelected={setSelectedSource}
          />
        </div>

        <div className="chart-container">
          <BarChart data={filteredData} />
        </div>
        <div className="chart-container">
          <PieChart data={filteredData} />
        </div>
        <div className="chart-container">
          <LineChart data={filteredData} />
        </div>
        <div className="chart-container">
          <LikelihoodChart data={filteredData} />
        </div>
        <div className="chart-container">
          <RelevanceChart data={filteredData} />
        </div>
      </main>
    </div>
  );
}

export default App;
