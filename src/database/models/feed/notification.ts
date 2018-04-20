import { Schema, SchemaOptions, model } from 'mongoose';
import { INotificationModel } from '../../../interfaces/database';

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};

// Feed Schema
const NotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    actions: {
        type: [{
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'Action',
        }],
        required: false,
    },
}, schemaOptions);

export const Notification = model<INotificationModel>('Notification', NotificationSchema);
