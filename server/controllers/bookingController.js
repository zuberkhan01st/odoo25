import Booking from '../models/Booking.js';
import Court from '../models/Court.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    // Prevent double booking
    const exists = await Booking.findOne({
      court: req.body.court,
      date: req.body.date,
      timeSlot: req.body.timeSlot,
      status: { $in: ['confirmed', 'completed'] }
    });
    if (exists) return res.status(400).json({ error: 'Time slot already booked' });

    const booking = new Booking({ ...req.body, user: req.user._id });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('venue', 'name')
      .populate('court', 'name sportType');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id, status: 'confirmed' },
      { status: 'cancelled' },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: 'Booking not found or cannot be cancelled' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
