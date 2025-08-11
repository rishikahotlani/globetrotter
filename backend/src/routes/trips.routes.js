import { Router } from 'express';
import {
  listTrips,
  createTrip,
  getTripById,
  updateTrip,
  deleteTrip,
} from '../controllers/trips.controller.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.use(authRequired);

router.get('/', listTrips);
router.post('/', createTrip);
router.get('/:tripId', getTripById);
router.put('/:tripId', updateTrip);
router.delete('/:tripId', deleteTrip);

export default router;


