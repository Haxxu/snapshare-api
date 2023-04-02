import { Router } from 'express';

import authController from '../controllers/AuthController';

const router = Router();

// [POST] /api/auth/register => register user
router.post('/auth/register', authController.register);

// [POST] /api/auth/active => register user
router.post('/auth/active', authController.activeAccount);

export default router;
