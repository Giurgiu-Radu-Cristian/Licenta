const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    contractId: { type: String, required: true },
    University: { type: String, required: true },
    Counterparty: { type: String, required: true },
    City: { type: String, required: true },
    Country: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    images: [String],
    counterpartyDomain: { type: String, required: true },
    "Type of contract": { type: String, required: true },
    Purpose: { type: String, required: true },
    objectives: { type: String, required: true },
    "Contract Start Date": { type: String, required: true },
    Duration: { type: String, required: true },
    Status: { type: String, required: true }
});

module.exports = mongoose.model('Contract', contractSchema);
