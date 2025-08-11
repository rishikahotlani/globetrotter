import { Router } from 'express';
import * as users from '../controllers/users.controller.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.post('/register', users.registerUser);
router.post('/login', users.loginUser);
router.get('/me', authRequired, users.me);

export default router;


