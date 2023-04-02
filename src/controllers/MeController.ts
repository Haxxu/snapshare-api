import { NextFunction, Response } from 'express';

import { IReqAuth } from '../config/interface';
import ApiError from '../utils/ApiError';
import UserService from '../services/UserService';
import Post from '../models/Post';

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
            await userService.follow(follow_user._id.toString());

            return res
                .status(200)
                .json({ message: 'Follow user successfully' });
        } catch (error) {
            console.log(error);
            return next(new ApiError());
        }
    }

    async unfollowUser(req: IReqAuth, res: Response, next: NextFunction) {
        try {
            const unfollow_user = await UserService.findOne({
                _id: req.body.user,
            });
            if (!unfollow_user) {
                return next(new ApiError(404, 'Unfollow user not found'));
            }

            const userService = new UserService(req.user?._id);
            await userService.unfollow(unfollow_user._id.toString());

            return res
                .status(200)
                .json({ message: 'Unfollow user successfully' });
        } catch (error) {
            console.log(error);
            return next(new ApiError());
        }
    }

    async savePost(req: IReqAuth, res: Response, next: NextFunction) {
        try {
            const post = await Post.findOne({ _id: req.body.post });
            if (!post)
                return res.status(404).json({ message: 'Post not found.' });

            const userService = new UserService(req.user?._id);
            await userService.savePost(req.body.post);

            return res.status(200).json({ message: 'Save post successfully' });
        } catch (error) {
            console.log(error);
            return next(new ApiError());
        }
    }

    async removeSavedPost(req: IReqAuth, res: Response, next: NextFunction) {
        try {
            const post = await Post.findOne({ _id: req.body.post });
            if (!post)
                return res.status(404).json({ message: 'Post not found.' });

            const userService = new UserService(req.user?._id);
            await userService.removeSavedPost(req.body.post);

            return res
                .status(200)
                .json({ message: 'Remove saved post successfully' });
        } catch (error) {
            console.log(error);
            return next(new ApiError());
        }
    }

    async likePost(req: IReqAuth, res: Response, next: NextFunction) {
        try {
            const post = await Post.findOne({ _id: req.body.post });
            if (!post)
                return res.status(404).json({ message: 'Post not found.' });

            const userService = new UserService(req.user?._id);
            await userService.likePost(req.body.post);

            return res.status(200).json({ message: 'Like post successfully' });
        } catch (error) {
            console.log(error);
            return next(new ApiError());
        }
    }

    async unlikePost(req: IReqAuth, res: Response, next: NextFunction) {
        try {
            const post = await Post.findOne({ _id: req.body.post });
            if (!post)
                return res.status(404).json({ message: 'Post not found.' });

            const userService = new UserService(req.user?._id);
            await userService.unlikePost(req.body.post);

            return res
                .status(200)
                .json({ message: 'Unlike post successfully' });
        } catch (error) {
            console.log(error);
            return next(new ApiError());
        }
    }
}

export default new MeController();
