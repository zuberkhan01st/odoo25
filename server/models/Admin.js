import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Owner name is required.'],
    minlength: [2, 'Name must be at least 2 characters long.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
    index: true
  },
  password: {
    type: String,
    select: false // hide in queries by default
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String, // profile picture URL
    trim: true
  },

  // Relationship: One Owner can have multiple Venues
  venues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue'
  }],

  // Activity Tracking
  totalBookings: {
    type: Number,
    default: 0
  },
  lastActiveAt: {
    type: Date
  }

}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
