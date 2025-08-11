const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Book a court
router.post('/', bookingController.createBooking);
// Get user's bookings
router.get('/my', bookingController.getUserBookings);
// Cancel a booking
router.patch('/:id/cancel', bookingController.cancelBooking);

module.exports = router;
