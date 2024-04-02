export const processDataForBarChart = (jsonData) => {
  const groupedData = jsonData.reduce((acc, item) => {
    const intensityValue = isNaN(Number(item.intensity))
      ? 0
      : Number(item.intensity);
    acc[item.sector] = (acc[item.sector] || 0) + intensityValue;
    return acc;
  }, {});

  return {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Intensity by Sector",
        data: Object.values(groupedData),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
};

export const processDataForPieChart = (jsonData) => {
  const topicCount = jsonData.reduce((acc, item) => {
    acc[item.topic] = (acc[item.topic] || 0) + 1;
    return acc;
  }, {});

  const backgroundColors = Object.keys(topicCount).map(
    (_, index) =>
      `hsl(${(index * 360) / Object.keys(topicCount).length}, 100%, 70%)`
  );

  return {
    labels: Object.keys(topicCount),
    datasets: [
      {
        data: Object.values(topicCount),
        backgroundColor: backgroundColors,
      },
    ],
  };
};

export const processDataForLineChart = (jsonData, selectedSector = "All") => {
  const yearIntensity = jsonData.reduce((acc, item) => {
    const year = parseInt(item.end_year, 10);
    const intensity = parseFloat(item.intensity);
    if (
      (selectedSector === "All" || item.sector === selectedSector) &&
      !isNaN(year) &&
      !isNaN(intensity)
    ) {
      if (!acc[year]) {
        acc[year] = { totalIntensity: 0, count: 0 };
      }
      acc[year].totalIntensity += intensity;
      acc[year].count++;
    }

    return acc;
  }, {});

  const sortedYears = Object.keys(yearIntensity)
    .map(Number)
    .sort((a, b) => a - b);
  const averageIntensities = sortedYears.map((year) => ({
    x: year.toString(),
    y:
      yearIntensity[year].count > 0
        ? yearIntensity[year].totalIntensity / yearIntensity[year].count
        : 0,
  }));

  return {
    labels: sortedYears,
    datasets: [
      {
        label: `Average Intensity ${
          selectedSector === "All" ? "" : ` for ${selectedSector}`
        }`,
        data: averageIntensities,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 3,
      },
    ],
  };
};

export const processDataForLikelihoodChart = (jsonData) => {
  const likelihoodBySector = jsonData.reduce((acc, item) => {
    const likelihoodValue = isNaN(Number(item.likelihood))
      ? 0
      : Number(item.likelihood);
    if (likelihoodValue > 0) {
      acc[item.sector] = acc[item.sector] || [];
      acc[item.sector].push(likelihoodValue);
    }
    return acc;
  }, {});

  const sectors = Object.keys(likelihoodBySector);
  const likelihoodData = sectors.map((sector) => {
    const values = likelihoodBySector[sector];
    const total = values.reduce((sum, current) => sum + current, 0);
    const average = (total / values.length).toFixed(2);
    return average;
  });

  return {
    labels: sectors,
    datasets: [
      {
        label: "Average Likelihood",
        data: likelihoodData,
        backgroundColor: sectors.map(
          (_, i) => `hsl(${(i * 360) / sectors.length}, 50%, 50%)`
        ),
        borderColor: sectors.map(
          (_, i) => `hsl(${(i * 360) / sectors.length}, 50%, 25%)`
        ),
        borderWidth: 1,
      },
    ],
  };
};

export const processDataForRelevanceChart = (jsonData) => {
  const relevanceBySector = jsonData.reduce((acc, item) => {
    const relevanceValue = isNaN(Number(item.relevance))
      ? 0
      : Number(item.relevance);
    if (relevanceValue > 0) {
      acc[item.sector] = acc[item.sector] || [];
      acc[item.sector].push(relevanceValue);
    }
    return acc;
  }, {});

  const sectors = Object.keys(relevanceBySector);
  const relevanceData = sectors.map((sector) => {
    const values = relevanceBySector[sector];
    const total = values.reduce((sum, current) => sum + current, 0);
    const average = (total / values.length).toFixed(2);
    return average;
  });

  return {
    labels: sectors,
    datasets: [
      {
        label: "Average Relevance",
        data: relevanceData,
        backgroundColor: sectors.map(
          (_, i) => `hsl(${(i * 360) / sectors.length}, 50%, 50%)`
        ),
        borderColor: sectors.map(
          (_, i) => `hsl(${(i * 360) / sectors.length}, 50%, 25%)`
        ),
        borderWidth: 1,
      },
    ],
  };
};
