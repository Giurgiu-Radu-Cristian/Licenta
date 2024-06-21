const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    "#": { type: String },
    "Contract ID": { type: String },
    "University": { type: String },
    "Counterparty": { type: String },
    "Counterparty location": { type: String },
    "": { type: String }, // Empty key field
    "Counterparty domain of activity": { type: String },
    "Type of contract": { type: String },
    "Purpose": { type: String },
    "Objectives": { type: String },
    "Contract Start Date": { type: String },
    "Duration": { type: String },
    "Status": { type: String }
});

module.exports = mongoose.model('Contract', contractSchema);