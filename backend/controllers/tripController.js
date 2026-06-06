const Trip = require('../models/Trip');

// @desc    Create a new trip
// @route   POST /api/trips
const createTrip = async (req, res) => {
    const { destination, startDate, endDate, notes, preferences } = req.body;

    try {
        const trip = await Trip.create({ destination, startDate, endDate, notes, preferences });
        res.status(201).json({ message: 'Trip created successfully', trip });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @desc    Get all trips
// @route   GET /api/trips
const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find().sort({ createdAt: -1 });
        res.status(200).json({ count: trips.length, trips });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @desc    Get a single trip by ID
// @route   GET /api/trips/:id
const getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json({ trip });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @desc    Update a trip
// @route   PUT /api/trips/:id
const updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json({ message: 'Trip updated successfully', trip });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { createTrip, getAllTrips, getTripById, updateTrip, deleteTrip };