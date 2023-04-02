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
}

export default UserService;
