const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venueController');

// List all approved venues, search, filter, get single venue
router.get('/', venueController.getVenues); // ?search=, ?sportType=, ?priceMin=, ?priceMax=, ?rating=
router.get('/:id', venueController.getVenueById);

module.exports = router;
