import * as mongoose from 'mongoose';

interface IAction {
    user: string;
    object: string;
    IsHidden: boolean;
    type: 'post' | 'comment' | 'reaction' | 'follow';
    relevancy: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IActionModel extends IAction, mongoose.Document {}
