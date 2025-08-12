import { getAllFacilitiesAdmin } from '../controllers/adminController.js';
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  adminSignup,
  adminLogin,
  getDashboardStats,
  getPendingFacilities,
  getFacilityDetails,
  approveFacility,
  rejectFacility,
  getAllUsersAndOwners,
  banUser,
  unbanUser,
  getUserBookingHistory,
  getReports,
  takeActionOnReport,
  getAdminProfile,
  updateAdminProfile
} from '../controllers/adminController.js';

const router = express.Router();

// Auth
router.post('/signup', adminSignup);
router.post('/login', adminLogin);

// Protected admin routes
router.get('/dashboard', protect, getDashboardStats);
router.get('/facilities/pending', protect, getPendingFacilities);
router.get('/facilities/:id', protect, getFacilityDetails);
router.post('/facilities/:id/approve', protect, approveFacility);
router.post('/facilities/:id/reject', protect, rejectFacility);
router.get('/users', protect, getAllUsersAndOwners);
router.post('/users/:id/ban', protect, banUser);
router.post('/users/:id/unban', protect, unbanUser);
router.get('/users/:id/bookings', protect, getUserBookingHistory);
router.get('/reports', protect, getReports);
router.post('/reports/:id/action', protect, takeActionOnReport);
router.get('/profile', protect, getAdminProfile);
router.put('/profile', protect, updateAdminProfile);
router.get('/facilities/all', protect, getAllFacilitiesAdmin);

export default router;
