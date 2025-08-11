import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Owner from '../models/Owner.js';
import Venue from '../models/Venue.js';
import Court from '../models/Court.js';
import Booking from '../models/Booking.js';
import Admin from '../models/Admin.js';
import Review from '../models/Review.js';
// Admin Signup
export const adminSignup = async (req, res) => {
	try {
		const { name, email, password, phone, avatar } = req.body;
		if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required.' });
		const existing = await Admin.findOne({ email });
		if (existing) return res.status(400).json({ error: 'Email already registered.' });
		const hashed = await bcrypt.hash(password, 10);
		const admin = new Admin({ name, email, password: hashed, phone, avatar });
		await admin.save();
		const token = jwt.sign({ id: admin._id, email: admin.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
		res.status(201).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, phone: admin.phone, avatar: admin.avatar } });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Admin Login
export const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });
		const admin = await Admin.findOne({ email }).select('+password');
		if (!admin) return res.status(400).json({ error: 'Invalid credentials.' });
		const match = await bcrypt.compare(password, admin.password);
		if (!match) return res.status(400).json({ error: 'Invalid credentials.' });
		const token = jwt.sign({ id: admin._id, email: admin.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
		res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, phone: admin.phone, avatar: admin.avatar } });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};


// Dashboard: Global stats, trends, earnings, activity
export const getDashboardStats = async (req, res) => {
	try {
		const [totalUsers, totalOwners, totalBookings, totalCourts, totalVenues] = await Promise.all([
			User.countDocuments(),
			Owner.countDocuments(),
			Booking.countDocuments(),
			Court.countDocuments(),
			Venue.countDocuments()
		]);

		// Booking activity over time (last 12 months)
		const bookingsByMonth = await Booking.aggregate([
			{ $group: {
				_id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
				count: { $sum: 1 }
			} },
			{ $sort: { _id: 1 } }
		]);

		// User registration trends (last 12 months)
		const usersByMonth = await User.aggregate([
			{ $group: {
				_id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
				count: { $sum: 1 }
			} },
			{ $sort: { _id: 1 } }
		]);

		// Facility approval trend (last 12 months)
		const facilitiesByMonth = await Venue.aggregate([
			{ $group: {
				_id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
				approved: {
					$sum: { $cond: [{ $eq: ['$approvalStatus', 'approved'] }, 1, 0] }
				},
				pending: {
					$sum: { $cond: [{ $eq: ['$approvalStatus', 'pending'] }, 1, 0] }
				},
				rejected: {
					$sum: { $cond: [{ $eq: ['$approvalStatus', 'rejected'] }, 1, 0] }
				}
			} },
			{ $sort: { _id: 1 } }
		]);

		// Most active sports (by bookings)
		const sports = await Booking.aggregate([
			{ $lookup: { from: 'courts', localField: 'court', foreignField: '_id', as: 'court' } },
			{ $unwind: '$court' },
			{ $group: { _id: '$court.sportType', count: { $sum: 1 } } },
			{ $sort: { count: -1 } },
			{ $limit: 5 }
		]);

		// Earnings simulation (sum of paid bookings)
		const earnings = await Booking.aggregate([
			{ $match: { paymentStatus: 'paid' } },
			{ $group: { _id: null, total: { $sum: '$price' } } }
		]);

		res.json({
			totalUsers,
			totalOwners,
			totalBookings,
			totalCourts,
			totalVenues,
			bookingsByMonth,
			usersByMonth,
			facilitiesByMonth,
			mostActiveSports: sports,
			earnings: earnings[0]?.total || 0
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Facility Approval Page
export const getPendingFacilities = async (req, res) => {
	try {
		const pending = await Venue.find({ approvalStatus: 'pending' }).populate('owner');
		res.json(pending);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getFacilityDetails = async (req, res) => {
	try {
		const venue = await Venue.findById(req.params.id).populate('owner');
		if (!venue) return res.status(404).json({ error: 'Facility not found' });
		res.json(venue);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const approveFacility = async (req, res) => {
	try {
		const venue = await Venue.findByIdAndUpdate(req.params.id, { approvalStatus: 'approved', approvalComment: req.body.comment || '' }, { new: true });
		if (!venue) return res.status(404).json({ error: 'Facility not found' });
		res.json({ message: 'Facility approved', venue });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const rejectFacility = async (req, res) => {
	try {
		const venue = await Venue.findByIdAndUpdate(req.params.id, { approvalStatus: 'rejected', approvalComment: req.body.comment || '' }, { new: true });
		if (!venue) return res.status(404).json({ error: 'Facility not found' });
		res.json({ message: 'Facility rejected', venue });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// User Management
export const getAllUsersAndOwners = async (req, res) => {
	try {
		const { role, status, q } = req.query;
		let userFilter = {};
		if (role === 'user') userFilter = { ...userFilter, __t: { $ne: 'Owner' } };
		if (role === 'owner') userFilter = { ...userFilter, __t: 'Owner' };
		if (q) userFilter = { ...userFilter, name: { $regex: q, $options: 'i' } };
		// For now, fetch both users and owners
		const users = await User.find(userFilter);
		const owners = await Owner.find(q ? { name: { $regex: q, $options: 'i' } } : {});
		res.json({ users, owners });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const banUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, { banned: true }, { new: true });
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.json({ message: 'User banned', user });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const unbanUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, { banned: false }, { new: true });
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.json({ message: 'User unbanned', user });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const getUserBookingHistory = async (req, res) => {
	try {
		const bookings = await Booking.find({ user: req.params.id })
			.populate('venue', 'name')
			.populate('court', 'name sportType');
		res.json(bookings);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};


export const getReports = async (req, res) => {
	res.json([]); // No Report model yet
};


export const takeActionOnReport = async (req, res) => {
	res.json({ message: 'Action taken (placeholder)' });
};

// Admin Profile
export const getAdminProfile = async (req, res) => {
	try {
		const admin = await Admin.findById(req.user._id).select('-password');
		if (!admin) return res.status(404).json({ error: 'Admin not found' });
		res.json(admin);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const updateAdminProfile = async (req, res) => {
	try {
		const admin = await Admin.findByIdAndUpdate(req.user.id, req.body, { new: true, select: '-password' });
		if (!admin) return res.status(404).json({ error: 'Admin not found' });
		res.json(admin);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
