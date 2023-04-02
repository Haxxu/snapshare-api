import Post from '../models/Post';
import User from '../models/User';

interface IUserUpdatePayload {
    name: string;
    description: string;
    image: string;
}

class UserService {
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    static async findOne(condition: object) {
        return await User.findOne(condition);
    }

    static async createNewUser(payload: object) {
        const newUser = await new User(payload).save();

        newUser.password = '';
        newUser.__v = undefined;

        return newUser;
    }

    static async getUserByIdPublic(id: string) {
        return await User.findOne({ _id: id }).select(
            '-password -__v -role -saved_posts -liked_posts'
        );
    }

    static async countTotalPostsByUserId(id: string) {
        return await User.find({ owner: id }).count();
    }

    async update(payload: IUserUpdatePayload) {
        return await User.findOneAndUpdate(
            { _id: this.id },
            { $set: payload },
            { new: true }
        ).select('-password -__v -role');
    }

    async follow(follow_user_id: string) {
        const user = await User.findOne({ _id: this.id });
        const follow_user = await User.findOne({ _id: follow_user_id });

        let index = user?.following
            .map((item) => item.user_id)
            .indexOf(follow_user_id);
        if (index === -1) {
            user?.following.push({
                user_id: follow_user_id,
                added_at: Date.now(),
            });
            follow_user?.followers.push({
                user_id: user?._id,
                added_at: Date.now(),
            });
        }

        await user?.save();
        await follow_user?.save();
    }

    async unfollow(unfollow_user_id: string) {
        const user = await User.findOne({ _id: this.id });
        const unfollow_user = await User.findOne({ _id: unfollow_user_id });

        let indexInFollowing = user?.following
            .map((item) => item.user_id)
            .indexOf(unfollow_user_id);

        if (indexInFollowing !== -1) {
            user?.following.splice(indexInFollowing || -1, 1);

            let indexInFollowers = unfollow_user?.followers
                .map((item) => item.user_id)
                .indexOf(user?._id);
            unfollow_user?.followers.splice(indexInFollowers || -1, 1);
        }

        await user?.save();
        await unfollow_user?.save();
    }

    async getFollowing() {
        let followingArray = [];
        const user = await User.findOne({ _id: this.id });

        let followingLen = user?.following.length || 0;

        for (let i = 0; i < followingLen; ++i) {
            const u = await User.findOne({
                _id: user?.following[i].user_id,
            })
                .select('-password -__v -role -saved_posts -liked_posts')
                .lean();
            followingArray.push(u);
        }

        return followingArray;
    }

    async getFollowers() {
        let followersArray = [];
        const user = await User.findOne({ _id: this.id });

        let followersLen = user?.followers.length || 0;

        for (let i = 0; i < followersLen; ++i) {
            const u = await User.findOne({
                _id: user?.followers[i].user_id,
            })
                .select('-password -__v -role -saved_posts -liked_posts')
                .lean();
            followersArray.push(u);
        }

        return followersArray;
    }

    async totalPosts() {
        return await Post.find({ owner: this.id }).count();
    }

    async getPosts() {
        // Chua xong
        let postsArray = [];
        const posts = await Post.find({ owner: this.id }).count();
    }

    async savePost(postId: string) {
        const user = await User.findOne({ _id: this.id });

        let index = user?.saved_posts
            .map((item) => item.post_id)
            .indexOf(postId);
        if (index === -1) {
            user?.saved_posts.unshift({
                post_id: postId,
                added_at: Date.now(),
            });
        }

        await user?.save();
    }

    async removeSavedPost(postId: string) {
        const user = await User.findOne({ _id: this.id });

        let index = user?.saved_posts
            .map((item) => item.post_id)
            .indexOf(postId);
        if (index !== -1) {
            user?.saved_posts.splice(index || -1, 1);
        }

        await user?.save();
    }

    async likePost(postId: string) {
        const user = await User.findOne({ _id: this.id });

        let index = user?.liked_posts
            .map((item) => item.post_id)
            .indexOf(postId);
        if (index === -1) {
            user?.liked_posts.unshift({
                post_id: postId,
                added_at: Date.now(),
            });
        }

        await user?.save();
    }

    async unlikePost(postId: string) {
        const user = await User.findOne({ _id: this.id });

        let index = user?.liked_posts
            .map((item) => item.post_id)
            .indexOf(postId);
        if (index !== -1) {
            user?.liked_posts.splice(index || -1, 1);
        }

        await user?.save();
    }
}

export default UserService;
