import * as express from 'express';
import * as Joi from 'joi';
import { HttpError } from '../../../interfaces/errors/HttpError';

const createPost = Joi.object().keys({
    title: Joi.string().min(5).trim().lowercase().required(),
    userId: Joi.string().length(24).alphanum().required(),
    hidden: Joi.boolean().required(),
});

const getFeed = Joi.object().keys({
    page: Joi.number().min(1),
});

const getPost = Joi.object().keys({
    page: Joi.number().min(1),
    perPage: Joi.number().min(1).max(100),
    resource: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string(),
    partial: Joi.bool(),
    populate: Joi.string(),
});

export const createPostMiddleware = (title: string, hidden: boolean, userId: string) => {
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

export const getPostMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.query, getPost, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
