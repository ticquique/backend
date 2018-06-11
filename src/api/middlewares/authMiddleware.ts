import * as express from 'express';
import { ApiKey } from '../../database/models/apiKey';
import { env } from '../../env';
import { HttpError } from '../../interfaces/errors/HttpError';
import { AuthService } from '../services/AuthService';

export const authMiddleware = (level: 'min' | 'basic' | 'admin' | 'super') => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authService = AuthService.getInstance();
    new Promise((resolve, reject) => {
        if (req.headers && req.get('api_key')) {
            ApiKey.find({ key: req.get('api_key') }, (err, doc) => {
                if (err || !doc.length) { reject(); } else {
                    if (doc[0].key_name === 'admin') { resolve(); } else { reject(); }
                }
            });
        } else { reject(); }
    }).then(isApi => {next(); }).catch(() => {
        if (level === 'basic' || level === 'min') {
            if (req.headers && req.get('authorization')) {
                authService.validateToken(req.get('authorization'))
                    .then((decoded) => {
                        res.locals.user = decoded;
                        next();
                    })
                    .catch((err) => {
                        const e = new HttpError(env.api.error, err.message);
                        next(e);
                    });
            } else {
                if (level === 'basic') {
                    const e = new HttpError(env.api.error, 'Log in to continue');
                    next(e);
                } else {
                    next();
                }
            }
        } else {
            const e = new HttpError(env.api.error, 'Permission denied');
            next(e);
        }
    });
};
