export interface IUser {
    name: string;
    account: string;
    password: string;
    image: string;
    description: string;
    followers: IUserAdded[];
    following: IUserAdded[];
    savedPosts: IPostAdded[];
    likedPosts: IPostAdded[];
    role?: string;
    _doc: object;
}

export interface IUserAdded {
    user_id: string;
    added_at: Date;
}

export interface IPostAdded {
    post_id: string;
    added_at: Date;
}

export interface INewUser {
    name: string;
    account: string;
    password: string;
    description: string;
}

export interface IDecodedToken {
    id?: string;
    newUser?: INewUser;
    iat: number;
    exp: number;
}
