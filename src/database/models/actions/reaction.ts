import { Schema, SchemaOptions, model } from 'mongoose';
import { IReactionModel } from '../../../interfaces/database';
const reactions = ['like', 'dislike', 'love', 'fun'];
const references = ['Post'];

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
        refPath: 'reference',
    },
    reference: {
        type: String,
        required: true,
        enum: references,
        default: 'Post',
    },
}, schemaOptions);
export const Reaction = model<IReactionModel>('Reaction', ReactionSchema);
