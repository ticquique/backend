import * as express from 'express';
import * as Joi from 'joi';
import { HttpError } from '../../../interfaces/errors/HttpError';

const createReaction = Joi.object().keys({
    type: Joi.string().allow('like', 'dislike', 'love', 'fun').required(),
    user: Joi.string().length(24).alphanum(),
    related: Joi.string().length(24).alphanum().required(),
    reference: Joi.string().allow('Post'),
});

const getReaction = Joi.object().keys({
    page: Joi.number().min(1),
    perPage: Joi.number().min(1).max(100),
    resource: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string(),
    partial: Joi.bool(),
    populate: Joi.string(),
});

// GET /v1/reaction
export const getReactionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.query, getReaction, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// POST /v1/reaction
export const createReactionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.body, createReaction, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
