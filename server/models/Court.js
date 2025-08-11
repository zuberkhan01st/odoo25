const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  name: { type: String, required: true },
  sportType: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  operatingHours: {
    start: { type: String, required: true }, // e.g., '08:00'
    end: { type: String, required: true }    // e.g., '22:00'
  },
  amenities: [{ type: String }],
  photos: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Court', courtSchema);
