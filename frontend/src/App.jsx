import React, { useState } from 'react';
import RoiForm from './components/RoiForm';
import RoiResult from './components/RoiResult';
import './styles/App.css';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="App">
      <div className="content-wrapper">
        <h1>Invoicing ROI Simulator</h1>
        <RoiForm setResult={setResult} />
        {result && <RoiResult result={result} />}
      </div>
    </div>
  );
}

export default App;
