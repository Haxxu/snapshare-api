import { Router } from 'express';

import { userAuth } from '../middlewares/auth';
import postController from '../controllers/PostController';

const router = Router();

// [PATCH] /api/posts/:id => update post by id
router.patch('/posts/:id', userAuth, postController.updatePostById);

// [DELETE] /api/posts/:id => delete post by id
router.delete('/posts/:id', userAuth, postController.deletePostById);

// [POST] /api/posts/ => create post
router.post('/posts', userAuth, postController.createPost);

export default router;
