import React from 'react';

const RoiCard = ({ title, value, color }) => {
  return (
    <div className={`roi-card ${color}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default RoiCard;
