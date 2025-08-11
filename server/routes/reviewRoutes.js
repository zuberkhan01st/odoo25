
import express from 'express';
import { createReview, getVenueReviews } from '../controllers/reviewController.js';
const router = express.Router();

// Create a review
router.post('/', createReview);
router.get('/venue/:venueId', getVenueReviews);

export default router;
