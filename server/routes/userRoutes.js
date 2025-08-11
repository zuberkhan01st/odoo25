import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserInsights,
  getAllFacilities,
  getFacilityById,
  getCourtsByFacility,
  getUserBookings,
  getBookingById,
  findCourtsBySportCategory,
  findCourtsWithinVenue,
  getAllCourts,
  getCourtsByCategory
} from '../controllers/userController.js';

const router = express.Router();

// User profile
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// User insights
router.get('/insights', getUserInsights);

// Facilities (venues)
router.get('/facilities', getAllFacilities);
router.get('/facilities/:id', getFacilityById);
router.get('/facilities/:venueId/courts', getCourtsByFacility);

// Courts
router.get('/courts', getAllCourts); // all courts
router.get('/courts/category', getCourtsByCategory); // courts by category (sportType)
router.get('/courts/search', findCourtsBySportCategory); // courts by sportType (query)
router.get('/courts/venue/:venueId', findCourtsWithinVenue); // courts within a venue

// Bookings
router.get('/bookings', getUserBookings);
router.get('/bookings/:id', getBookingById);

export default router;
