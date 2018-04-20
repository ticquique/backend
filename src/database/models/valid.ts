import { Schema, SchemaOptions, model } from 'mongoose';
import { regexMail } from '../../api/validators';
import { IValidModel } from '../../interfaces/database/valid';

const roles = ['artist', 'publisher', 'public'];
const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};
const ValidSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: roles,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: regexMail,
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 40,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 80,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    vars: {
        type: Array,
        required: false,
    },
    token: {
        type: String,
        required: true,
    },
}, schemaOptions);

export const Valid = model<IValidModel>('Valid', ValidSchema);
