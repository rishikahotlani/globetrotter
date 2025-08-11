import express from 'express';
import {
  listCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity
} from '../controllers/cities.controller.js';

const router = express.Router();

// GET /api/cities - List all cities with filtering and pagination
router.get('/', listCities);

// GET /api/cities/:cityId - Get a specific city
router.get('/:cityId', getCityById);

// POST /api/cities - Create a new city
router.post('/', createCity);

// PUT /api/cities/:cityId - Update a city
router.put('/:cityId', updateCity);

// DELETE /api/cities/:cityId - Delete a city
router.delete('/:cityId', deleteCity);

export default router;
