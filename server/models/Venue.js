const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  amenities: [{ type: String }],
  photos: [{ type: String }], // URLs or file paths
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  sports: [{ type: String }], // e.g., ['badminton', 'tennis']
  createdAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Venue', venueSchema);
