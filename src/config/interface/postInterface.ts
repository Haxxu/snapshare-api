import { Document } from 'mongoose';

export interface IPost extends Document {
    owner: string;
    title: string;
    description: string;
    image: string;
    likes: ILike[];
    _doc: object;
}

export interface ILike {
    user: string;
    added_at?: any;
}
