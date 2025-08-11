const express = require('express');
const router = express.Router();
const courtController = require('../controllers/courtController');

// Get all courts for a venue
router.get('/venue/:venueId', courtController.getCourtsByVenue);
// Get single court
router.get('/:id', courtController.getCourtById);

module.exports = router;
