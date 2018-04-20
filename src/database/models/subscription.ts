import { Schema, SchemaOptions, model } from 'mongoose';
import { ISubscriptionModel } from '../../interfaces/database';

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};
// Conversation Schema
const SubscriptionSchema = new Schema({
    subscribable: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    subscriber: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
}, schemaOptions);

export const Subscription = model<ISubscriptionModel>('Subscription', SubscriptionSchema);
