import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  favorites: {
    venues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Venue' }],
    courts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Court' }],
  },
  name: {
    type: String,
    required: [true, 'Name field is required.'],
    minLength: [2, 'Name must be 2 character long.'],
  },
  email: {
    type: String,
    required: [true, 'Email field is required.'],
    unique: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    required: false,
  },
  password_reset_token: {
    type: String,
    required: false,
    trim: true,
  },
  magic_link_token: {
    type: String,
    required: false,
    trim: true,
  },
  magic_link_sent_at: {
    type: Date,
    required: false,
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  preferredPlayTimes: [{
    type: String
  }],
  favoriteSports: [{
    type: String,
    trim: true
  }],

  location: {
    city: { type: String, trim: true },
    area: { type: String, trim: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  }
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;