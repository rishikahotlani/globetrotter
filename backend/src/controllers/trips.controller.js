import { z } from 'zod';
import Trip from '../models/Trip.js';

const tripSchema = z.object({
  title: z.string().min(1, 'Trip title is required'),
  description: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  budget: z.number().min(0, 'Budget must be a positive number'),
  cities: z.array(z.object({
    name: z.string().min(1, 'City name is required'),
    country: z.string().min(1, 'Country is required'),
    region: z.string().optional(),
    costLevel: z.enum(['budget', 'moderate', 'luxury']).optional(),
    highlights: z.array(z.string()).optional(),
    activities: z.array(z.object({
      name: z.string().min(1, 'Activity name is required'),
      type: z.enum(['cultural', 'adventure', 'food', 'nature', 'entertainment', 'shopping', 'other']),
      cost: z.number().min(0, 'Cost must be a positive number'),
      duration: z.number().min(1, 'Duration must be at least 1'),
      description: z.string().optional(),
      city: z.string().min(1, 'City is required')
    })).optional()
  })).default([]),
  activities: z.array(z.object({
    name: z.string().min(1, 'Activity name is required'),
    type: z.enum(['cultural', 'adventure', 'food', 'nature', 'entertainment', 'shopping', 'other']),
    cost: z.number().min(0, 'Cost must be a positive number'),
    duration: z.number().min(1, 'Duration must be at least 1'),
    description: z.string().optional(),
    city: z.string().min(1, 'City is required')
  })).default([]),
  status: z.enum(['planning', 'active', 'completed', 'cancelled']).optional(),
  userId: z.string().min(1, 'User ID is required')
});

export async function listTrips(req, res) {
  try {
    const trips = await Trip.find({ userId: req.user?.id }).sort({ createdAt: -1 });
    res.json({ trips });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips', details: error.message });
  }
}

export async function createTrip(req, res) {
  try {
    const parsed = tripSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parsed.error.errors });
    }

    const tripData = {
      ...parsed.data,
      startDate: new Date(parsed.data.startDate),
      endDate: new Date(parsed.data.endDate),
      userId: req.user?.id,
    };

    const trip = new Trip(tripData);
    await trip.save();
    
    res.status(201).json({ trip });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.message });
    }
    res.status(500).json({ error: 'Failed to create trip', details: error.message });
  }
}

export async function getTripById(req, res) {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, userId: req.user?.id });
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json({ trip });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trip', details: error.message });
  }
}

export async function updateTrip(req, res) {
  try {
    const parsed = tripSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parsed.error.errors });
    }

    const updateData = { ...parsed.data };
    if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
    if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);

    const updated = await Trip.findOneAndUpdate(
      { _id: req.params.tripId, userId: req.user?.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json({ trip: updated });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.message });
    }
    res.status(500).json({ error: 'Failed to update trip', details: error.message });
  }
}

export async function deleteTrip(req, res) {
  try {
    const deleted = await Trip.findOneAndDelete({ _id: req.params.tripId, userId: req.user?.id });
    if (!deleted) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trip', details: error.message });
  }
}


