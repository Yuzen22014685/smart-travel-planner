// 1. FORCE NODE.JS TO USE GOOGLE DNS TO BYPASS THE WINDOWS INTERNAL BUG
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

// MongoDB Cloud Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB Atlas! 🎉'))
    .catch((err) => console.error('Database connection error ❌:', err));

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Smart Travel Planner API is running successfully!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is happily running on port ${PORT}`);
});