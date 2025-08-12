import express from 'express';
import { createBooking, getUserBookings, cancelBooking, createPaymentOrder } from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js'; // adjust path as needed

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getUserBookings);
router.patch('/:id/cancel', protect, cancelBooking);
router.post('/create_payment', protect, createPaymentOrder);

export default router;
