const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');

router.get('/contracts', async (req, res) => {
    try {
        const { university } = req.query;
        let contracts;

        if (university) {
            // Use case-insensitive regex search to match 'University' or 'university'
            contracts = await Contract.find({ $or: [
                { University: new RegExp(university, 'i') },
                { university: new RegExp(university, 'i') }
            ] });
        } else {
            contracts = await Contract.find();
        }

        console.log(contracts); // Log contracts to see what is being returned
        res.json(contracts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
