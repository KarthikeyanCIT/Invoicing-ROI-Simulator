import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Chart = ({ manualCost, automatedCost, roi }) => {
  const barData = {
    labels: ['Manual Cost', 'Automated Cost'],
    datasets: [{
      label: 'Monthly Cost',
      data: [manualCost, automatedCost],
      backgroundColor: ['#f87171','#34d399'],
    }],
  };

  const doughnutData = {
    labels: ['ROI %', 'Remaining'],
    datasets: [{
      data: [roi, 100 - roi],
      backgroundColor: ['#60a5fa', '#d1d5db'],
    }],
  };

  return (
    <div className="charts">
      <Bar data={barData} />
      <Doughnut data={doughnutData} />
    </div>
  );
};

export default Chart;
