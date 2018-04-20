import { Schema, SchemaOptions, model } from 'mongoose';
import { IReactionModel } from '../../../interfaces/database';
const reactions = ['like', 'dislike', 'love', 'fun'];

const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};

// Reaction Schema
const ReactionSchema = new Schema({
    type: {
        type: String,
        enum: reactions,
    },
    user: {
        type: String,
        required: true,
    },
    related: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, schemaOptions);
export const Reaction = model<IReactionModel>('Reaction', ReactionSchema);
