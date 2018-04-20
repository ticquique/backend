import * as express from 'express';
import * as Joi from 'joi';
import { HttpError } from '../../../interfaces/errors/HttpError';

const listSubscriptions = Joi.object().keys({
    query: {
        page: Joi.number().min(1),
        perPage: Joi.number().min(1).max(100),
        resource: Joi.string(),
        sort: Joi.string(),
        filter: Joi.string(),
        partial: Joi.bool(),
        optional: Joi.string(),
    },
    headers: Joi.object({
        api_key: Joi.string().length(36),
    }).options({ allowUnknown: true }),
});

const createSubscription = Joi.object().keys({
    headers: Joi.object({
        api_key: Joi.string().length(36),
    }).options({ allowUnknown: true }),
    subscription: Joi.object({
        subscriber: Joi.string().length(24).alphanum(),
        subscribable: Joi.string().length(24).alphanum(),
    }).required(),
});

const deleteSubscription = Joi.object().keys({
    headers: Joi.object({
        api_key: Joi.string().length(36),
    }).options({ allowUnknown: true }),
    body: Joi.object({
        subscription: Joi.string().length(24).alphanum(),
        subscribable: Joi.string().length(24).alphanum(),
    }).required(),
});

// GET /v1/chat
export const listSubscriptionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate({query: req.query, headers: req.headers}, listSubscriptions, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
// POST /v1/chat
export const createSubscriptionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate({subscription: req.body, headers: req.headers}, createSubscription, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
// DELETE /v1/chat
export const deleteSubscriptionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate({body: req.body, headers: req.headers}, deleteSubscription, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
