import { Router } from 'express';

const router = Router();

router.get('/user', () => console.log('hello'));

export default router;
