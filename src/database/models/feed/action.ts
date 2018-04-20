import { Schema, SchemaOptions, model } from 'mongoose';
import { IActionModel } from '../../../interfaces/database';

const types = ['post', 'comment', 'reaction', 'follow'];

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};

// Action Schema
const ActionSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    object: {
        type: Schema.Types.ObjectId,
        required: true,
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
    relevancy: {
        type: Number,
        required: false,
        default: 0,
    },
}, schemaOptions);

export const Action = model<IActionModel>('Action', ActionSchema);
