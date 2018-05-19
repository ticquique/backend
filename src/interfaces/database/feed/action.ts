import * as mongoose from 'mongoose';
export interface IAction {
    user?: string;
    object?: string;
    IsHidden?: boolean;
    type?: 'Post' | 'Comment' | 'Reaction' | 'Subscription' | 'Message';
    relevancy?: number;
    createdAt?: Date;
    updatedAt?: Date;
    notified?: boolean;
}

export interface IActionModel extends IAction, mongoose.Document {}
