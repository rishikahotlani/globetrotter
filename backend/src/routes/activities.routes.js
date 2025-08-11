import express from 'express';
import {
  listActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity
} from '../controllers/activities.controller.js';

const router = express.Router();

// GET /api/activities - List all activities with filtering and pagination
router.get('/', listActivities);

// GET /api/activities/:activityId - Get a specific activity
router.get('/:activityId', getActivityById);

// POST /api/activities - Create a new activity
router.post('/', createActivity);

// PUT /api/activities/:activityId - Update an activity
router.put('/:activityId', updateActivity);

// DELETE /api/activities/:activityId - Delete an activity
router.delete('/:activityId', deleteActivity);

export default router;
