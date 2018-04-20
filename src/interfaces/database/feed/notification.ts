import * as mongoose from 'mongoose';

interface INotification {
    user?: string;
    actions?: string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface INotificationModel extends INotification, mongoose.Document {}
