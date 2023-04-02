import User from '../models/User';

class UserService {
    id: string;

    constructor(id?: string) {
        this.id = id || '';
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
}

export default UserService;
