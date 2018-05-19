
import * as express from 'express';
import * as Joi from 'joi';
import { HttpError } from '../../../interfaces/errors/HttpError';

const listNotifications = Joi.object().keys({
    page: Joi.number().min(1),
    perPage: Joi.number().min(1).max(100),
    resource: Joi.any(),
    sort: Joi.string(),
    filter: Joi.string(),
    partial: Joi.bool(),
    populate: Joi.any(),
    view: Joi.boolean(),
    actionFilter: Joi.string(),
    populateAction: Joi.string(),
});

// GET /v1/notification
export const listNotificationMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.query, listNotifications, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
