import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  region: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  costLevel: {
    type: String,
    enum: ['budget', 'moderate', 'luxury'],
    required: true
  },
  averageDailyCost: {
    type: Number,
    required: true,
    min: 0
  },
  highlights: [String],
  imageUrl: {
    type: String,
    default: ''
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  timezone: String,
  language: String,
  currency: String,
  bestTimeToVisit: {
    start: String,
    end: String
  },
  tags: [String]
}, {
  timestamps: true
});

// Create compound index for efficient searching
citySchema.index({ name: 1, country: 1 });
citySchema.index({ costLevel: 1 });
citySchema.index({ region: 1 });
citySchema.index({ tags: 1 });

export default mongoose.model('City', citySchema);
