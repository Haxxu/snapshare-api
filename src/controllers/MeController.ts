import { NextFunction, Response } from 'express';

import { IReqAuth } from '../config/interface';
import ApiError from '../utils/ApiError';
import UserService from '../services/UserService';

class MeController {
    async followUser(req: IReqAuth, res: Response, next: NextFunction) {
        try {
            const follow_user = await UserService.findOne({
                _id: req.body.user,
            });
            if (!follow_user) {
                return next(new ApiError(404, 'Follow user not found'));
            }

            const userService = new UserService(req.user?._id);
            await userService.follow(follow_user._id);

            return res
                .status(200)
                .json({ message: 'Follow user successfully' });
        } catch (error) {
            console.log(error);
            return next(new ApiError());
        }
    }
}

export default new MeController();
