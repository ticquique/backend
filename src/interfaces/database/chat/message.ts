import * as mongoose from 'mongoose';
import { IUserModel } from '..';

export interface IMessage {
    conversation?: string;
    body?: string[];
    author?: string | IUserModel;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMessageModel extends IMessage, mongoose.Document {}
