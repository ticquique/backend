
import * as express from 'express';
import * as Joi from 'joi';
import { HttpError } from '../../../interfaces/errors/HttpError';

const createCustomer = Joi.object().keys({
    body: Joi.object({
        code: Joi.string().required(),
        scope: Joi.string().required(),
    }),
    id: Joi.string().length(24).alphanum(),
});

const createCharge = Joi.object().keys({
    body: Joi.object({
        account: Joi.string().required(),
        donate: Joi.boolean() ,
        token: Joi.string() ,
        email: Joi.string() ,
        amount: Joi.number().required(),
    }),
});

// POST /v1/donative/
export const createCustomerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let user: string;
    const headers = req.headers;
    if (headers.api_key && req.query.userid) {
        user = req.query.userid;
    } else if (res.locals && res.locals.user && res.locals.user.sub) {
        user = res.locals.user.sub;
    } else {
        const e: HttpError = new HttpError(401, 'Login to continue');
        next(e);
    }
    Joi.validate({ id: user, body: req.body }, createCustomer, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// POST /v1/donative/charge
export const createChargeMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate({body: req.body}, createCharge, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, 'Login to continue');
            next(e);
        } else {
            next();
        }
    });
};
