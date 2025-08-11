const Review = require('../models/Review');

// Create a review
exports.createReview = async (req, res) => {
  try {
    const review = new Review({ ...req.body, user: req.user._id });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get reviews for a venue
exports.getVenueReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ venue: req.params.venueId })
      .populate('user', 'fullName avatar');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
