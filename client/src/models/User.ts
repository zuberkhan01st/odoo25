import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  password_reset_token?: string;
  magic_link_token?: string;
  magic_link_sent_at?: Date;
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  preferredPlayTimes?: string[];
  favoriteSports?: string[];
  location?: {
    city?: string;
    area?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
  };
}

const userSchema: Schema<IUser> = new Schema({
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

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);