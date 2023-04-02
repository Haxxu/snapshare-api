import { Router } from 'express';

import userController from '../controllers/UserController';
import { userAuth } from '../middlewares/auth';
import meController from '../controllers/MeController';

const router = Router();

// [PUT] /api/me/following => follow user
router.put('/me/following', userAuth, meController.followUser);

// [DELETE] /api/me/following => unfollow user
router.delete('/me/following', userAuth, meController.unfollowUser);

// [PUT] /api/me/saved-posts => saved post
router.put('/me/saved-posts', userAuth, meController.savePost);

// [DELETE] /api/me/saved-posts => remove saved post
router.delete('/me/saved-posts', userAuth, meController.removeSavedPost);

// [PUT] /api/me/liked-posts => like post
router.put('/me/liked-posts', userAuth, meController.likePost);

// [DELETE] /api/me/liked-posts => remove like post
router.delete('/me/liked-posts', userAuth, meController.unlikePost);

export default router;
