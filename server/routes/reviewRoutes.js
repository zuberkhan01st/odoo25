const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a review
router.post('/', reviewController.createReview);
// Get reviews for a venue
router.get('/venue/:venueId', reviewController.getVenueReviews);

module.exports = router;
