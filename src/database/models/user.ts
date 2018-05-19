import * as bcrypt from 'bcrypt';
import { HookNextFunction, Schema, SchemaOptions, model } from 'mongoose';
import { regexMail, regexWebsite } from '../../api/validators';
import { env } from '../../env';
import { IUserModel } from '../../interfaces/database';

const SALT_WORK_FACTOR = env.db.salt;
const roles = ['artist', 'publisher', 'public'];
const privacy = ['public', 'semirestricted', 'restricted', 'private'];
const privileges = ['member', 'client', 'owner', 'admin'];
const gender = ['Male', 'Female', 'Undefined', 'Other'];
const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
};
// User Schema
const UserSchema = new Schema({
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
        maxlength: 80,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 80,
        select: false,
    },
    posts: {
        type: [{
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'Post',
        }],
    },
    privacy: {
        type: String,
        required: false,
        enum: privacy,
        default: 'public',
    },
    reaction: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Reaction',
    }],
    numComments: {
        type: Number, default: 0, required: false,
    },
    privileges: {
        type: String,
        enum: privileges,
        default: 'member',
    },
    profile: {
        picture: {
            type: String,
            required: false,
            default: 'https://gravatar.com/avatar/?s=200&d=retro',
        },
        profilePicture: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        country: {
            type: Schema.Types.ObjectId,
            required: false,
            rel: 'Country',
        },
        birth_date: {
            type: Number,
            required: false,
        },
        gender: {
            type: String,
            enum: gender,
            default: 'Undefined',
        },
        phone: {
            type: String,
            required: false,
        },
        hobbies: {
            type: String,
            required: false,
        },
        website: {
            type: String,
            required: false,
            match: regexWebsite,
        },
        facebook: {
            type: String,
            required: false,
        },
        twitter: {
            type: String,
            required: false,
        },
        google: {
            type: String,
            required: false,
        },
        stripe: {
            type: String,
            required: false,
        },
    },
    points: {
        firstreg: { type: Number, default: 10, required: false },
        numComments: { type: Number, default: 0, required: false },
        numLikes: { type: Number, default: 0, required: false },
    },
    passwordResetToken: {
        type: String,
        required: false,
    },
    passwordResetExpires: {
        type: Date,
        required: false,
    },
}, schemaOptions);

UserSchema.pre('save', function(this: IUserModel, next: HookNextFunction): any {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) { return next(error); }
            user.password = hash;
            next();
        });
    });
});

UserSchema.method('comparePassword', function(this: IUserModel, password: string): boolean {
    const user = this;
    if (bcrypt.compareSync(password, user.password)) { return true; }
    return false;
});

export const User = model<IUserModel>('User', UserSchema);
