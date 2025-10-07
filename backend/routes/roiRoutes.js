const express = require('express');
const router = express.Router();
const RoiResult = require('../models/RoiResult');

router.post('/calculate', async (req, res) => {
    const { invoicesPerMonth, manualCost, automatedCost, setupCost, trainingCost } = req.body;

    const monthlySavings = (manualCost - automatedCost) * invoicesPerMonth;
    const annualSavings = monthlySavings * 12;
    const investment = setupCost + (trainingCost || 0);
    const roiPercentage = ((annualSavings - investment) / investment) * 100;
    const paybackPeriod = monthlySavings ? (investment / monthlySavings) : 0;

    const result = new RoiResult({
        invoicesPerMonth, manualCost, automatedCost, setupCost, trainingCost,
        monthlySavings, annualSavings, roiPercentage, paybackPeriod
    });

    await result.save();
    res.json(result);
});

router.get('/history', async (req, res) => {
    const results = await RoiResult.find().sort({ createdAt: -1 });
    res.json(results);
});

module.exports = router;
