const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');

// Route to fetch all contracts
router.get('/contracts', async (req, res) => {
    try {
        const contracts = await Contract.find(); // Fetch all contracts from MongoDB
        console.log('Fetched contracts:', contracts); // Log fetched contracts
        res.json(contracts); // Send JSON response with fetched contracts
    } catch (err) {
        console.error('Error fetching contracts:', err.message); // Log error
        res.status(500).json({ message: err.message }); // Handle errors
    }
});

module.exports = router;