
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  ownerSignup,
  ownerLogin,
  getDashboardKPIs,
  addVenue,
  addFacility,
  updateFacility,
  addCourt,
  updateCourt,
  deleteCourt,
  setCourtAvailability,
  blockCourtSlots,
  getOwnerBookings,
  getProfile,
  updateProfile,
  addMultipleCourts, changeOwnerPassword, getFacilities
} from '../controllers/ownerController.js';

const router = express.Router();

// Public auth routes
router.post('/signup', ownerSignup);
router.post('/login', ownerLogin);

// Protected owner routes
router.get('/dashboard', protect, getDashboardKPIs);
router.post('/venue', protect, addVenue); // Add venue and link to owner
router.post('/facility', protect, addFacility); // (legacy/additional)
router.get('/facility', protect, getFacilities);
router.put('/facility/:id', protect, updateFacility);
router.post('/court', protect, addCourt);
router.post('/courts', protect, addMultipleCourts); // Add multiple courts under a venue
router.put('/court/:id', protect, updateCourt);
router.delete('/court/:id', protect, deleteCourt);
router.post('/court/availability', protect, setCourtAvailability);
router.post('/court/block', protect, blockCourtSlots);
router.get('/bookings', protect, getOwnerBookings);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/change-password',protect, changeOwnerPassword);


export default router;
