
import express from 'express';
import { getCourtsByVenue, getCourtById } from '../controllers/courtController.js';
const router = express.Router();

// Get all courts for a venue
// Get single court
router.get('/venue/:venueId', getCourtsByVenue);
router.get('/:id', getCourtById);

export default router;
