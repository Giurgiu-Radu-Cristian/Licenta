const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const contractRoutes = require('./routes/contractRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('src/public'));

// Use topic routes
app.use('/api/contracts', contractRoutes);

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Default route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});