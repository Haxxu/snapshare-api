import { Router } from 'express';

import userController from '../controllers/UserController';
import { userAuth } from '../middlewares/auth';
import meController from '../controllers/MeController';

const router = Router();

// [PATCH] /api/users/:id => update user by id
router.put('/me/following', userAuth, meController.followUser);

// [GET] /api/users/:id => get user by id
router.delete('/me/following', userAuth, userController.getUserById);

export default router;
