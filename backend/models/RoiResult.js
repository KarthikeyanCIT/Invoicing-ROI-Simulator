const mongoose = require('mongoose');

const roiResultSchema = new mongoose.Schema({
    invoicesPerMonth: Number,
    manualCost: Number,
    automatedCost: Number,
    setupCost: Number,
    trainingCost: Number,
    monthlySavings: Number,
    annualSavings: Number,
    roiPercentage: Number,
    paybackPeriod: Number,
}, { timestamps: true });

module.exports = mongoose.model('RoiResult', roiResultSchema);
