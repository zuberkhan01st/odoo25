import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import Venue from '../models/Venue.js';
import Court from '../models/Court.js';

// Search for a venue by name or location
export const searchVenues = async (req, res) => {
	try {
		const { q } = req.query;
		if (!q) return res.status(400).json({ error: 'Search query required' });
		const venues = await Venue.find({
			approvalStatus: 'approved',
			$or: [
				{ name: { $regex: q, $options: 'i' } },
				{ location: { $regex: q, $options: 'i' } }
			]
		});
		res.json(venues);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get popular venues (by bookings count)
export const getPopularVenues = async (req, res) => {
	try {
		const venues = await Venue.aggregate([
			{ $match: { approvalStatus: 'approved' } },
			{ $lookup: { from: 'bookings', localField: '_id', foreignField: 'venue', as: 'bookings' } },
			{ $addFields: { bookingsCount: { $size: '$bookings' } } },
			{ $sort: { bookingsCount: -1 } },
			{ $limit: 10 }
		]);
		res.json(venues);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get popular sports (by bookings count)
export const getPopularSports = async (req, res) => {
	try {
		const sports = await Booking.aggregate([
			{ $lookup: { from: 'courts', localField: 'court', foreignField: '_id', as: 'court' } },
			{ $unwind: '$court' },
			{ $group: { _id: '$court.sportType', count: { $sum: 1 } } },
			{ $sort: { count: -1 } },
			{ $limit: 5 }
		]);
		res.json(sports);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get venues with filters and pagination
export const getFilteredVenues = async (req, res) => {
	try {
		const { sportType, priceMin, priceMax, venueType, rating, page = 1, limit = 10 } = req.query;
		const filter = { approvalStatus: 'approved' };
		if (sportType) filter.sports = sportType;
		if (venueType) filter.venueType = venueType;
		if (rating) filter.rating = { $gte: Number(rating) };
		if (priceMin || priceMax) filter['courts.pricePerHour'] = {};
		if (priceMin) filter['courts.pricePerHour'].$gte = Number(priceMin);
		if (priceMax) filter['courts.pricePerHour'].$lte = Number(priceMax);

		const venues = await Venue.find(filter)
			.skip((page - 1) * limit)
			.limit(Number(limit));
		res.json(venues);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Cancel a booking (if in the future)
export const cancelBooking = async (req, res) => {
	try {
		const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id, status: 'confirmed' });
		if (!booking) return res.status(404).json({ error: 'Booking not found or cannot be cancelled' });
		if (new Date(booking.date) < new Date()) return res.status(400).json({ error: 'Cannot cancel past bookings' });
		booking.status = 'cancelled';
		await booking.save();
		res.json({ message: 'Booking cancelled', booking });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get reviews for a venue
export const getVenueReviews = async (req, res) => {
	try {
		const reviews = await Review.find({ venue: req.params.venueId })
			.populate('user', 'name avatar');
		res.json(reviews);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

//Getting courts
export const getAllCourts = async (req,res)=>{
    try{
        const courts = await Courts.find();
        if(!courts){
            return res.status(400).json({
                message:"Fetched the courts successfully", courts
            });
        }
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}


export const findCourtsBySportCategory = async (req, res) => {
	try {
		const { sportType } = req.query;
		if (!sportType) return res.status(400).json({ error: 'sportType query param required' });
		const courts = await Court.find({ sportType });
		res.json(courts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Find courts within a specific venue
export const findCourtsWithinVenue = async (req, res) => {
	try {
		const { venueId } = req.params;
		if (!venueId) return res.status(400).json({ error: 'venueId param required' });
		const courts = await Court.find({ venue: venueId });
		res.json(courts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get all approved facilities (venues)
export const getAllFacilities = async (req, res) => {
	try {
		const venues = await Venue.find({ approvalStatus: 'approved' });
		res.json(venues);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get single facility by ID
export const getFacilityById = async (req, res) => {
	try {
		const venue = await Venue.findById(req.params.id);
		if (!venue) return res.status(404).json({ error: 'Facility not found' });
		res.json(venue);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get courts for a facility (venue)
export const getCourtsByFacility = async (req, res) => {
	try {
		const courts = await Court.find({ venue: req.params.venueId });
		res.json(courts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get all bookings for a user
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

// Get booking by ID
export const getBookingById = async (req, res) => {
	try {
		const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id })
			.populate('venue', 'name')
			.populate('court', 'name sportType');
		if (!booking) return res.status(404).json({ error: 'Booking not found' });
		res.json(booking);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get courts by category (sport type)
export const getCourtsByCategory = async (req, res) => {
	try {
		const { sportType } = req.query;
		const filter = sportType ? { sportType } : {};
		const courts = await Court.find(filter);
		res.json(courts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};



// Get user insights (bookings this week, avg rating, new users, etc.)
export const getUserInsights = async (req, res) => {
	try {
		// Bookings this week
		const startOfWeek = new Date();
		startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
		startOfWeek.setHours(0, 0, 0, 0);
		const bookingsThisWeek = await Booking.countDocuments({
			createdAt: { $gte: startOfWeek },
		});

		// Average rating
		const ratingAgg = await Review.aggregate([
			{ $group: { _id: null, avgRating: { $avg: '$rating' } } }
		]);
		const avgRating = ratingAgg[0]?.avgRating || 0;

		// New users this week
		const newUsers = await User.countDocuments({
			createdAt: { $gte: startOfWeek },
		});

		// Conversion funnel (dummy data for now)
		const funnel = {
			visit: 1000,
			viewFacility: 800,
			pickSlot: 400,
			confirm: 324,
		};

		// Activity heatmap (dummy data for now)
		const heatmap = [
			{ day: 'Mon', bookings: 40 },
			{ day: 'Tue', bookings: 50 },
			{ day: 'Wed', bookings: 60 },
			{ day: 'Thu', bookings: 70 },
			{ day: 'Fri', bookings: 50 },
			{ day: 'Sat', bookings: 30 },
			{ day: 'Sun', bookings: 24 },
		];

		res.json({
			bookingsThisWeek,
			avgRating: Number(avgRating.toFixed(2)),
			newUsers,
			funnel,
			heatmap,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get user profile
export const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-password');
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Update user profile
export const updateUserProfile = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, select: '-password' });
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

