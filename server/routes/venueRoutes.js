
import express from 'express';
import { getVenues, getVenueById } from '../controllers/venueController.js';
const router = express.Router();

// List all approved venues, search, filter, get single venue
router.get('/', getVenues); // ?search=, ?sportType=, ?priceMin=, ?priceMax=, ?rating=
router.get('/:id', getVenueById);

export default router;
