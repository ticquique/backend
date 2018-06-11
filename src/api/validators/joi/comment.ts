import * as express from 'express';
import * as Joi from 'joi';
import { HttpError } from '../../../interfaces/errors/HttpError';

const getComment = Joi.object().keys({
    page: Joi.number().min(1),
    perPage: Joi.number().min(1).max(100),
    resource: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string(),
    partial: Joi.bool(),
    populate: Joi.string(),
});

const createComment = Joi.object().keys({
    discussionId: Joi.string().length(24).alphanum().required(),
    text: Joi.string().required(),
    name: Joi.string().alphanum().min(3).max(80).required(),
    user: Joi.string().length(24).alphanum(),
});

// GET /v1/comment
export const getCommentMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.body, getComment, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// POST /v1/comment
export const createCommentMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.body, createComment, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
