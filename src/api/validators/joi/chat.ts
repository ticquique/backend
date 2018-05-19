import * as express from 'express';
import * as Joi from 'joi';
import { HttpError } from '../../../interfaces/errors/HttpError';
const messageValidator = Joi.object().keys({
    conversation: Joi.string().length(24).alphanum().required(),
    body: Joi.string().required(),
});

const newConversationValidator = Joi.object().keys({
    participants: Joi.array().items(Joi.string().length(24).alphanum()),
    message: {
        body: Joi.string().required(),
    },
});

const listConversations = Joi.object().keys({
    page: Joi.number().min(1),
    perPage: Joi.number().min(1).max(100),
    resource: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string(),
    partial: Joi.bool(),
    populate: Joi.string(),
});

const createConversation = Joi.object().keys({
    headers: Joi.object({
        api_key: Joi.string().length(36),
    }).options({ allowUnknown: true }),
    message: Joi.object({
        body: Joi.string().required(),
        author: Joi.string().length(24).alphanum().required(),
    }).required(),
    conversation: Joi.object({
        participants: Joi.array().items(Joi.string().length(24).alphanum()).required(),
    }).required(),
});

const deleteConversation = Joi.object().keys({
    id: Joi.string().length(24).required(),
});

const listMessages = Joi.object().keys({
    page: Joi.number().min(1),
    perPage: Joi.number().min(1).max(100),
    resource: Joi.string(),
    sort: Joi.string(),
    filter: Joi.string(),
    partial: Joi.bool(),
    populate: Joi.any(),
});

const deleteMessage = Joi.object().keys({
    id: Joi.string().length(24).required(),
});
// GET /v1/chat
export const listConversationsMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.query, listConversations, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
// GET /v1/chat/message
export const listMessagesMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.params, listMessages, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
// POST /v1/chat
export const createConversationMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.body, createConversation, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};
// DELETE /v1/chat
export const deleteConversationMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.body, deleteConversation, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

// DELETE /v1/chat/message
export const deleteMessageMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Joi.validate(req.body, deleteMessage, (err, value) => {
        if (err) {
            const e: HttpError = new HttpError(401, err.message);
            next(e);
        } else {
            next();
        }
    });
};

export const validateMessage = (message) => {
    const {error} = Joi.validate(message, messageValidator);
    if (error) {return false; } else {return true; }
};

export const validateNewConversation = ({participants, message}) => {
    const {error} = Joi.validate({participants, message}, newConversationValidator);
    if (error) {return false; } else {return true; }
};
