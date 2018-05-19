import * as express from 'express';
import * as Joi from 'joi';
import * as uuid from 'uuid/v4';
import { regexMongoId } from '..';
import { HttpError } from '../../../interfaces/errors/HttpError';

const roles = ['artist', 'publisher', 'public'];
const privacy = ['public', 'semirestricted', 'restricted', 'private'];
const privileges = ['member', 'client', 'owner', 'admin'];
const gender = ['Male', 'Female', 'Undefined', 'Other'];

const listUsers = Joi.object().keys({
    page: Joi.number().min(1),
    perPage: Joi.number().min(1).max(100),
    resource: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string(),
    partial: Joi.bool(),
    populate: Joi.string(),
});
const listValids = Joi.object().keys({
    page: Joi.number().min(1),
    perPage: Joi.number().min(1).max(100),
    resource: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string(),
    partial: Joi.bool(),
});
const createUser = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(80).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid(roles).required(),
    password: Joi.string().min(8).max(80).required(),
});
const registerUser = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(80).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid(roles).required(),
    password: Joi.string().min(8).max(80).required(),
    token: Joi.string().length(36).required(),
    vars: Joi.array(),
});
const validateRegister = Joi.object().keys({
    token: Joi.string().length(36).required(),
});
const getToken = Joi.object().keys({
    username: Joi.string().min(3).max(80).required(),
    password: Joi.string().min(8).max(80).required(),
});
const deleteUser = Joi.object().keys({
    headers: Joi.object({
        api_key: Joi.string().length(36),
    }).options({ allowUnknown: true }),
    id: Joi.string().length(24).alphanum(),
});
const deleteValid = Joi.object().keys({
    headers: Joi.object({
        api_key: Joi.string().length(36).required(),
    }).options({ allowUnknown: true }),
    id: Joi.string().length(24).alphanum().required(),
});
const updateUser = Joi.object().keys({
    headers: Joi.object({
        api_key: Joi.string().length(36),
    }).options({ allowUnknown: true }),
    user: Joi.string().regex(regexMongoId),
    body: {
        role: Joi.string().valid(roles),
        email: Joi.string().email(),
        username: Joi.string().alphanum().min(3).max(80),
        privacy: Joi.string().valid(privacy),
        privileges: Joi.string().valid(privileges),
        profile: {
            picture: Joi.string().uri(),
            city: Joi.string(),
            country: Joi.string(),
            birts_date: Joi.date().min(Date.now() - 1000).max(Date.now()),
            gender: Joi.string().valid(gender),
            phone: Joi.string().min(5).max(20),
            hobbies: Joi.string().max(3000),
            website: Joi.string().uri(),
            facebook: Joi.string().uri(),
            twitter: Joi.string().uri(),
            google: Joi.string().uri(),
            stripe: Joi.string(),
        },
    },
});

const updatePassword = Joi.object().keys({
    headers: Joi.object({
        api_key: Joi.string().length(36),
    }).options({ allowUnknown: true }),
    user: Joi.string().regex(regexMongoId),
    body: {
        role: Joi.string().valid(roles),
        email: Joi.string().email(),
        username: Joi.string().alphanum().min(3).max(80),
        lastPassword: Joi.string().min(8).max(80).required(),
        rePassword: Joi.string().min(8).max(80).required(),
        newPassword: Joi.string().min(8).max(80).required(),
        privacy: Joi.string().valid(privacy),
        privileges: Joi.string().valid(privileges),
        profile: {
            picture: Joi.string().uri(),
            city: Joi.string(),
            country: Joi.string(),
            birts_date: Joi.date().min(Date.now() - 1000).max(Date.now()),
            gender: Joi.string().valid(gender),
            phone: Joi.string().min(5).max(20),
            hobbies: Joi.string().max(3000),
            website: Joi.string().uri(),
            facebook: Joi.string().uri(),
            twitter: Joi.string().uri(),
            google: Joi.string().uri(),
            stripe: Joi.string(),
        },
    },
});
// GET /v1/user
export const listUsersMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.query, listUsers, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
// GET /v1/user/validation
export const listValidsMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.query, listValids, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
// POST /v1/user
// Only situational
export const createUserMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.body, createUser, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// POST /v1/user/register
export const registerUserMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.body.password = uuid();
    req.body.token = uuid();
    Joi.validate(req.body, registerUser, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// POST /v1/user/validate
export const validateRegisterMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.body, validateRegister, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// POST /v1/user/auth
export const getTokenMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.body, getToken, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// DELETE /v1/user/
export const deleteUserMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
    Joi.validate({id: user}, deleteUser, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// DELETE /v1/user/validation
export const deleteRegistryMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate({headers: req.headers, id: req.query.id}, deleteValid, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// PATCH /v1/user/token
export const updateUserMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const body = req.body;
    const headers = req.headers;
    let user: string;
    if (headers.api_key && req.query.userid) {
        user = req.query.userid;
    } else if (res.locals && res.locals.user && res.locals.user.sub) {
        user = res.locals.user.sub;
    } else {
        const e: HttpError = new HttpError(401, 'Login to continue');
        next(e);
    }
    Joi.validate({ body, headers, user }, updateUser, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// PUT /v1/user/token
export const updatePasswordMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const body = req.body;
    const headers = req.headers;
    let user: string;
    if (headers.api_key && req.query.userid) {
        user = req.query.userid;
    } else if (res.locals && res.locals.user && res.locals.user.sub) {
        user = res.locals.user.sub;
    } else {
        const e: HttpError = new HttpError(401, 'Login to continue');
        next(e);
    }
    Joi.validate({ body, headers, user }, updatePassword, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// module.exports = {

//     // GET /v1/user
//     listUsers: {
//         query: {
//             page: Joi.number().min(1),
//             perPage: Joi.number().min(1).max(100),
//             name: Joi.string(),
//             email: Joi.string(),
//             role: Joi.string().valid(roles),
//         },
//     },

//     // POST /v1/users
//     createUser: {
//         body: {
//             email: Joi.string().email().required(),
//             password: Joi.string().min(6).max(128).required(),
//             name: Joi.string().max(128),
//             role: Joi.string().valid(roles),
//         },
//     },

//     // PUT /v1/users/:userId
//     replaceUser: {
//         body: {
//             email: Joi.string().email().required(),
//             password: Joi.string().min(6).max(128).required(),
//             name: Joi.string().max(128),
//             role: Joi.string().valid(roles),
//         },
//         params: {
//             userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
//         },
//     },

//     // PATCH /v1/users/:userId
//     updateUser: {
//         body: {
//             email: Joi.string().email(),
//             password: Joi.string().min(6).max(128),
//             name: Joi.string().max(128),
//             role: Joi.string().valid(roles),
//         },
//         params: {
//             userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
//         },
//     },
// };
