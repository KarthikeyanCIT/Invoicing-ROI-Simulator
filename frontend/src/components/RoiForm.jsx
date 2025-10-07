import React, { useState } from 'react';
import axios from 'axios';

const RoiForm = ({ setResult }) => {
  const [form, setForm] = useState({
    scenario_name: '',
    monthly_invoice_volume: '',
    num_ap_staff: '',
    avg_hours_per_invoice: '',
    hourly_wage: '',
    error_rate_manual: '',
    error_cost: '',
    time_horizon_months: '',
    one_time_implementation_cost: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/roi/calculate', form);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Error calculating ROI. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="roi-form">
      {/* Scenario Name */}
      <div>
        <label>Scenario Name</label>
        <input
          type="text"
          name="scenario_name"
          placeholder="Q4_Pilot"
          value={form.scenario_name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Monthly Invoice Volume */}
      <div>
        <label>Monthly Invoice Volume</label>
        <input
          type="number"
          name="monthly_invoice_volume"
          placeholder="2000"
          value={form.monthly_invoice_volume}
          onChange={handleChange}
          required
        />
      </div>

      {/* Number of AP Staff */}
      <div>
        <label>Number of AP Staff</label>
        <input
          type="number"
          name="num_ap_staff"
          placeholder="3"
          value={form.num_ap_staff}
          onChange={handleChange}
          required
        />
      </div>

      {/* Avg Hours per Invoice */}
      <div>
        <label>Avg Hours per Invoice</label>
        <input
          type="number"
          step="0.01"
          name="avg_hours_per_invoice"
          placeholder="0.17"
          value={form.avg_hours_per_invoice}
          onChange={handleChange}
          required
        />
      </div>

      {/* Hourly Wage */}
      <div>
        <label>Hourly Wage</label>
        <input
          type="number"
          name="hourly_wage"
          placeholder="30"
          value={form.hourly_wage}
          onChange={handleChange}
          required
        />
      </div>

      {/* Manual Error Rate */}
      <div>
        <label>Manual Error Rate (%)</label>
        <input
          type="number"
          step="0.01"
          name="error_rate_manual"
          placeholder="0.5"
          value={form.error_rate_manual}
          onChange={handleChange}
          required
        />
      </div>

      {/* Error Cost */}
      <div>
        <label>Error Cost</label>
        <input
          type="number"
          name="error_cost"
          placeholder="100"
          value={form.error_cost}
          onChange={handleChange}
          required
        />
      </div>

      {/* Time Horizon (Months) */}
      <div>
        <label>Time Horizon (Months)</label>
        <input
          type="number"
          name="time_horizon_months"
          placeholder="36"
          value={form.time_horizon_months}
          onChange={handleChange}
          required
        />
      </div>

      {/* One-Time Implementation Cost */}
      <div>
        <label>Implementation Cost </label>
        <input
          type="number"
          name="one_time_implementation_cost"
          placeholder="50000"
          value={form.one_time_implementation_cost}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <button type="submit">Calculate ROI</button>
    </form>
  );
};

export default RoiForm;
