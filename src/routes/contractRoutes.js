const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');

router.get('/contracts', async (req, res) => {
    try {
        const { university } = req.query;
        let contracts;

        if (university) {
            contracts = await Contract.find({ University: new RegExp(university, 'i') });
        } else {
            contracts = await Contract.find();
        }

        res.json(contracts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
