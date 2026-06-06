const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createTrip, getAllTrips, getTripById, updateTrip, deleteTrip } = require('../controllers/tripController');

router.post('/', protect, createTrip);
router.get('/', protect, getAllTrips);
router.get('/:id', protect, getTripById);
router.put('/:id', protect, updateTrip);
router.delete('/:id', protect, deleteTrip);

module.exports = router;