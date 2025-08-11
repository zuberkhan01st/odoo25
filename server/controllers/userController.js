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

import { getGroqRecommendations as groqRecommend } from '../services/groqService.js';
// AI-based personalized recommendations using Groq LLM
export const getAIRecommendations = async (req, res) => {
	try {
		const userId = req.user.id;
		// Fetch user's previous bookings
		const bookings = await Booking.find({ user: userId }).populate('court');
		const bookingHistory = bookings.map(b => ({
			date: b.date,
			sportType: b.court?.sportType,
			timeSlot: b.timeSlot,
			venue: b.venue,
		}));

		// Current booking request (if any)
		const current = req.body || {};

		// Enhanced, user-friendly prompt
		const prompt = `You are a smart sports booking assistant.\n\nHere is the user's booking history:\n${bookingHistory.map((b, i) => `#${i+1}: Sport: ${b.sportType}, Date: ${b.date}, Time: ${b.timeSlot}`).join('\n')}\n\nCurrent booking request: ${JSON.stringify(current)}\n\nBased on the user's history and current request, suggest 2-3 personalized recommendations for sports, courts, or time slots that would best suit the user's preferences and habits. Explain your reasoning in 1-2 sentences.`;

		// Call Groq LLM
		const recommendation = await groqRecommend({ body: { prompt } }, { send: false });
		res.json({ recommendation });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Add or remove a favorite venue/court for the user
export const toggleFavorite = async (req, res) => {
	try {
		const { type, id } = req.body; 
		if (!['venue', 'court'].includes(type)) return res.status(400).json({ error: 'Invalid type' });
		const user = await User.findById(req.user.id);
		if (!user) return res.status(404).json({ error: 'User not found' });
		user.favorites = user.favorites || { venues: [], courts: [] };
		const favArr = type === 'venue' ? user.favorites.venues : user.favorites.courts;
		const idx = favArr.indexOf(id);
		if (idx === -1) {
			favArr.push(id);
		} else {
			favArr.splice(idx, 1);
		}
		await user.save();
		res.json({ favorites: user.favorites });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get user's favorite venues/courts
export const getFavorites = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.json({ favorites: user.favorites || { venues: [], courts: [] } });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

import sendEmail from '../services/emailService.js';
export const createBooking = async (req, res) => {
	try {
		const { venue, court, date, timeSlot, price, paymentStatus, paymentMethod, transactionId } = req.body;
		// Check if slot is already booked
		const exists = await Booking.findOne({
			court,
			date,
			timeSlot,
			status: { $in: ['confirmed', 'completed'] }
		});
		if (exists) return res.status(400).json({ error: 'Time slot already booked' });

		// Create booking
		const booking = new Booking({
			user: req.user.id,
			venue,
			court,
			date,
			timeSlot,
			price,
			paymentStatus: paymentStatus || 'pending',
			paymentMethod,
			transactionId,
			status: 'confirmed'
		});
		await booking.save();

		// Send email notifications to user and venue
		const userDoc = await User.findById(req.user.id);
		const venueDoc = await Venue.findById(venue).populate('owner');
		const courtDoc = await Court.findById(court);
		const userEmail = userDoc?.email;
		const venueEmail = venueDoc?.owner?.email || venueDoc?.email;
		const bookingDetails = `Venue: ${venueDoc?.name}<br>Court: ${courtDoc?.name}<br>Date: ${date}<br>Time: ${timeSlot}<br>Price: ${price}`;

			if (userEmail) {
				await sendEmail(
					userEmail,
					'Booking Confirmed',
					`Your booking is confirmed!\n${bookingDetails},
					<h3>Your booking is confirmed!</h3><p>${bookingDetails}</p>`
				);
			}
			if (venueEmail) {
				await sendEmail(
					venueEmail,
					'New Booking Received',
					`A new booking has been made.\n${bookingDetails},
					<h3>New booking received!</h3><p>${bookingDetails}</p>`
				);
			}

		res.status(201).json(booking);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const addBookingReview = async (req, res) => {
	try {
		const { bookingId, rating, comment } = req.body;
		const booking = await Booking.findOne({ _id: bookingId, user: req.user.id });
		if (!booking) return res.status(404).json({ error: 'Booking not found' });
		const review = new Review({
			user: req.user.id,
			venue: booking.venue,
			booking: bookingId,
			rating,
			comment
		});
		await review.save();
		res.status(201).json(review);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};