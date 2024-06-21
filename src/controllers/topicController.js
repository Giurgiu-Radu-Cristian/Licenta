const Topic = require('../models/Topic');

exports.getTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        res.json(topics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTopic = async (req, res) => {
    const { title, description } = req.body;
    const newTopic = new Topic({ title, description });
    try {
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};