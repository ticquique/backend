import { Schema, SchemaOptions, model } from 'mongoose';
import { IActionModel } from '../../../interfaces/database';
const types = ['Post', 'Comment', 'Reaction', 'Subscription', 'Message'];

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};

// Action Schema
const ActionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    IsHidden: {
        type: Boolean,
        required: true,
        default: false,
    },
    type: {
        type: String,
        enum: types,
    },
    object: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'type',
    },
    relevancy: {
        type: Number,
        required: false,
        default: 0,
    },
    notified: {
        type: Boolean,
        required: false,
        default: true,
    },
}, schemaOptions);

export const Action = model<IActionModel>('Action', ActionSchema);
