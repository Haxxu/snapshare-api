import Comment from '../models/Comment';
import Post from '../models/Post';
import User from '../models/User';

interface IPostUpdatePayload {
    title: string;
    description: string;
    image: string;
}

class PostService {
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    static async findOne(condition: object) {
        return await Post.findOne(condition);
    }

    static async createNewPost(payload: object) {
        const newPost = await new Post(payload).save();

        newPost.__v = undefined;

        return newPost;
    }

    static async deletePostById(id: string) {
        await User.updateMany({}, { $pull: { saved_posts: { post_id: id } } });
        await User.updateMany({}, { $pull: { liked_posts: { post_id: id } } });
        await Comment.deleteMany({ post: id });
        await Post.findOneAndRemove({ _id: id });
    }

    async update(payload: IPostUpdatePayload) {
        return await Post.findOneAndUpdate(
            { _id: this.id },
            { $set: payload },
            { new: true }
        );
    }
}

export default PostService;
