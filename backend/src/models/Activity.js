import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['cultural', 'adventure', 'food', 'nature', 'entertainment', 'shopping', 'other']
  },
  description: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'challenging', 'expert'],
    default: 'moderate'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.0
  },
  imageUrl: {
    type: String,
    default: ''
  },
  location: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  tags: [String],
  bestTimeToVisit: {
    start: String,
    end: String
  },
  bookingRequired: {
    type: Boolean,
    default: false
  },
  website: String,
  phone: String
}, {
  timestamps: true
});

// Create indexes for efficient searching
activitySchema.index({ name: 1, city: 1 });
activitySchema.index({ type: 1 });
activitySchema.index({ city: 1, country: 1 });
activitySchema.index({ cost: 1 });
activitySchema.index({ duration: 1 });
activitySchema.index({ tags: 1 });

export default mongoose.model('Activity', activitySchema);
