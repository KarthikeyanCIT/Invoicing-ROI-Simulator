import React from 'react';
import RoiCard from './RoiCard';
import Chart from './Chart';

const RoiResult = ({ result }) => {
  return (
    <div className="roi-result-container">
      <h2>Calculation Result</h2>
      <div className="cards">
        <RoiCard title="Monthly Savings" value={`$${result.monthlySavings.toFixed(2)}`} color="green"/>
        <RoiCard title="Annual Savings" value={`$${result.annualSavings.toFixed(2)}`} color="blue"/>
        <RoiCard title="ROI" value={`${result.roiPercentage.toFixed(2)}%`} color="purple"/>
        <RoiCard title="Payback Period" value={`${result.paybackPeriod.toFixed(2)} months`} color="yellow"/>
      </div>
      <Chart manualCost={result.manualCost*result.invoicesPerMonth} automatedCost={result.automatedCost*result.invoicesPerMonth} roi={result.roiPercentage}/>
    </div>
  );
};

export default RoiResult;
