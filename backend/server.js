const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test connection
db.getConnection((err, connection) => {
    if (err) throw err;
    console.log("MySQL connected!");
    connection.release();
});

// Routes
app.post('/api/roi/calculate', (req, res) => {
    const { invoicesPerMonth, manualCost, automatedCost, setupCost, trainingCost } = req.body;

    const monthlySavings = (manualCost - automatedCost) * invoicesPerMonth;
    const annualSavings = monthlySavings * 12;
    const investment = setupCost + (trainingCost || 0);
    const roiPercentage = ((annualSavings - investment) / investment) * 100;
    const paybackPeriod = monthlySavings ? (investment / monthlySavings) : 0;

    const query = `
        INSERT INTO roi_results 
        (invoices_per_month, manual_cost, automated_cost, setup_cost, training_cost, monthly_savings, annual_savings, roi_percentage, payback_period)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [invoicesPerMonth, manualCost, automatedCost, setupCost, trainingCost || 0, monthlySavings, annualSavings, roiPercentage, paybackPeriod];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({
            id: result.insertId,
            invoicesPerMonth,
            manualCost,
            automatedCost,
            setupCost,
            trainingCost,
            monthlySavings,
            annualSavings,
            roiPercentage,
            paybackPeriod
        });
    });
});

// Fetch all previous results
app.get('/api/roi/history', (req, res) => {
    db.query('SELECT * FROM roi_results ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
