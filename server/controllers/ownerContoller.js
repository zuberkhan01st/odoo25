import User from '../models/User.js';
import Owner from '../models/Owner.js';
import Venue from '../models/Venue.js';
import Court from '../models/Court.js';
import Booking from '../models/Booking.js';


// Owner Dashboard KPIs
export const getDashboardKPIs = async (req, res) => {
    try {
        const ownerId = req.user.id;
        // Get all venues for this owner
        const venues = await Venue.find({ owner: ownerId });
        const venueIds = venues.map(v => v._id);

        // Bookings for all owner's venues
        const bookings = await Booking.find({ venue: { $in: venueIds } });

        // Daily/Weekly/Monthly booking trends
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0,0,0,0);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const daily = bookings.filter(b => new Date(b.createdAt).toDateString() === now.toDateString()).length;
        const weekly = bookings.filter(b => new Date(b.createdAt) >= startOfWeek).length;
        const monthly = bookings.filter(b => new Date(b.createdAt) >= startOfMonth).length;

        // Earnings summary
        const earnings = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? b.price : 0), 0);

        // Peak booking hours (heatmap)
        const hourMap = {};
        bookings.forEach(b => {
            const hour = b.timeSlot ? b.timeSlot.split('-')[0] : 'unknown';
            hourMap[hour] = (hourMap[hour] || 0) + 1;
        });

        res.json({
            dailyBookings: daily,
            weeklyBookings: weekly,
            monthlyBookings: monthly,
            earnings,
            peakHours: hourMap
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Facility Management
export const addFacility = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const venue = new Venue({ ...req.body, owner: ownerId });
        await venue.save();
        res.status(201).json(venue);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateFacility = async (req, res) => {
    try {
        const venue = await Venue.findOneAndUpdate({ _id: req.params.id, owner: req.user.id }, req.body, { new: true });
        if (!venue) return res.status(404).json({ error: 'Venue not found' });
        res.json(venue);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Court Management
export const addCourt = async (req, res) => {
    try {
        const { venueId } = req.body;
        const venue = await Venue.findOne({ _id: venueId, owner: req.user.id });
        if (!venue) return res.status(404).json({ error: 'Venue not found' });
        const court = new Court({ ...req.body, venue: venueId });
        await court.save();
        res.status(201).json(court);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateCourt = async (req, res) => {
    try {
        const court = await Court.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!court) return res.status(404).json({ error: 'Court not found' });
        res.json(court);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteCourt = async (req, res) => {
    try {
        const court = await Court.findOneAndDelete({ _id: req.params.id });
        if (!court) return res.status(404).json({ error: 'Court not found' });
        res.json({ message: 'Court deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Time Slot Management (simplified)
export const setCourtAvailability = async (req, res) => {
    try {
        const { courtId, availableSlots } = req.body;
        const court = await Court.findByIdAndUpdate(courtId, { availableSlots }, { new: true });
        if (!court) return res.status(404).json({ error: 'Court not found' });
        res.json(court);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const blockCourtSlots = async (req, res) => {
    try {
        const { courtId, blockedSlots } = req.body;
        const court = await Court.findByIdAndUpdate(courtId, { blockedSlots }, { new: true });
        if (!court) return res.status(404).json({ error: 'Court not found' });
        res.json(court);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Booking Overview
export const getOwnerBookings = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const venues = await Venue.find({ owner: ownerId });
        const venueIds = venues.map(v => v._id);
        const bookings = await Booking.find({ venue: { $in: venueIds } })
            .populate('user', 'name email')
            .populate('court', 'name');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Owner Profile
export const getProfile = async (req, res) => {
    try {
        const owner = await Owner.findById(req.user.id);
        if (!owner) return res.status(404).json({ error: 'Owner not found' });
        res.json(owner);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const owner = await Owner.findByIdAndUpdate(req.user.id, req.body, { new: true });
        if (!owner) return res.status(404).json({ error: 'Owner not found' });
        res.json(owner);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};