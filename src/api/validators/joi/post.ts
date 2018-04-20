import * as express from 'express';
import * as Joi from 'joi';
import { HttpError } from '../../../interfaces/errors/HttpError';
import { FileUploaded } from '../../../interfaces';

const createPost = Joi.object().keys({
    title: Joi.string().min(10).trim().lowercase().required(),
    userId: Joi.string().length(24).alphanum().required(),
    hidden: Joi.boolean().required(),
});

const getFeed = Joi.object().keys({
    id: Joi.string().length(24).trim().lowercase().required(),
    page: Joi.number().min(1),
});

export const createPostMiddleware = (title: string | FileUploaded[], isHidden: string | FileUploaded[], userId: string) => {
    const hidden = (isHidden === 'true');
    const { error } = Joi.validate({ title, hidden, userId }, createPost);
    if (error) { return error; } else { return true; }
};

export const getFeedMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.query, getFeed, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
