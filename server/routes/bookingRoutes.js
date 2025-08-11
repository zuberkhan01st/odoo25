
import express from 'express';
import { createBooking, getUserBookings, cancelBooking, createPaymentOrder } from '../controllers/bookingController.js';
const router = express.Router();


// Book a court
router.post('/', createBooking);
router.get('/my', getUserBookings);
router.patch('/:id/cancel', cancelBooking);
router.post('/create_payment', createPaymentOrder);

export default router;
