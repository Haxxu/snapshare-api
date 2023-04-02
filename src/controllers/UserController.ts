import { Response, Request, NextFunction } from 'express';

import { IReqAuth } from '../config/interface';
import ApiError from '../utils/ApiError';
import UserService from '../services/UserService';

class UserController {
    async getUserById(req: IReqAuth, res: Response, next: NextFunction) {
        try {
            const user = await UserService.getUserByIdPublic(req.params.id);
            if (!user) {
                return next(new ApiError(404, 'User not found.'));
            }

            return res
                .status(200)
                .json({ data: user, message: 'Get user successfully' });
        } catch (error) {
            console.log(error);
            return next(new ApiError());
        }
    }

    async updateUserById(req: IReqAuth, res: Response, next: NextFunction) {
        try {
            if (req.user?._id !== req.params.id) {
                return res.status(403).json({
                    message: "User don't have permisson to perform this action",
                });
            }

            const { name, image, description } = req.body;

            const userService = new UserService(req.params.id);

            const updated_user = await userService.update({
                name,
                image,
                description,
            });

            return res.status(200).json({
                data: updated_user,
                message: 'Update user successfully',
            });
        } catch (error) {
            console.log(error);
            return next(new ApiError());
        }
    }
}

export default new UserController();
