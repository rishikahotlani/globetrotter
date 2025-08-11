import { Router } from 'express';
import tripsRoutes from './trips.routes.js';
import usersRoutes from './users.routes.js';
import citiesRoutes from './cities.routes.js';
import activitiesRoutes from './activities.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Travel Globetrotter API is running' });
});

router.use('/trips', tripsRoutes);
router.use('/users', usersRoutes);
router.use('/cities', citiesRoutes);
router.use('/activities', activitiesRoutes);

export default router;


