import {} from 'express';

import userRouter from './userRouter';
import authRouter from './authRouter';
import meRouter from './meRouter';

const routes = [userRouter, authRouter, meRouter];

export default routes;
