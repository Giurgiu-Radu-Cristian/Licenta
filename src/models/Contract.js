const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    contractId: String,
    University: String, // Ensure this matches the data
    counterparty: String,
    counterpartyLocation: String,
    counterpartyDomain: String,
    contractType: String,
    purpose: String,
    objectives: String,
    startDate: Date,
    duration: String,
    status: String,
});

module.exports = mongoose.model('Contract', contractSchema);