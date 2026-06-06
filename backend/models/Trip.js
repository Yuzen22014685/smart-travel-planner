const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: [true, 'Destination is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    notes: {
        type: String,
        default: ''
    },
    preferences: {
        type: [String],
        default: []
    }
}, { 
    timestamps: true // This automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Trip', TripSchema);