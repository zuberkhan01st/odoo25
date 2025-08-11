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
  getCourtsByCategory,
  
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User profile
router.get('/profile',protect, getUserProfile);
router.put('/profile', protect,updateUserProfile);



// User insights
router.get('/insights',protect, getUserInsights);

// Facilities (venues)
router.get('/facilities',protect, getAllFacilities);
router.get('/facilities/:id',protect, getFacilityById);
router.get('/facilities/:venueId/courts',protect, getCourtsByFacility);

// Courts
router.get('/courts',protect, getAllCourts); // all courts
router.get('/courts/category',protect, getCourtsByCategory); // courts by category (sportType)
router.get('/courts/search',protect, findCourtsBySportCategory); // courts by sportType (query)
router.get('/courts/venue/:venueId',protect, findCourtsWithinVenue); // courts within a venue

// Bookings
router.get('/bookings',protect, getUserBookings);
router.get('/bookings/:id',protect, getBookingById);

export default router;
