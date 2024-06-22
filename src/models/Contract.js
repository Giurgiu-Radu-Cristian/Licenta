const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    contractId: { type: String, required: true },
    University: { type: String, required: true },
    counterparty: { type: String, required: true },
    counterpartyLocation: {
        city: { type: String, required: true },
        country: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    counterpartyDomain: { type: String, required: true },
    contractType: { type: String, required: true },
    purpose: { type: String, required: true },
    objectives: { type: String, required: true },
    startDate: { type: Date, required: true },
    duration: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Contract', contractSchema);
