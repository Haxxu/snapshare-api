import { Router } from 'express';

import userController from '../controllers/UserController';
import { userAuth } from '../middlewares/auth';

const router = Router();

// [PATCH] /api/users/:id => update user by id
router.patch('/users/:id', userAuth, userController.updateUserById);

// [GET] /api/users/:id => get user by id
router.get('/users/:id', userAuth, userController.getUserById);

// [GET] /api/users/:id => update user by id
router.get('/users', () => console.log('hello'));

export default router;
