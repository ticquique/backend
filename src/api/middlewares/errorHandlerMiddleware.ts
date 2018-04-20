import * as express from 'express';
import { env } from '../../env';
import { HttpError } from '../../interfaces/errors/HttpError';
import { Logger } from '../../lib/logger';

export const ErrorHandlerMiddleware = (error: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const isProduction = env.isProduction;
    const log = new Logger(__dirname);
    res.status(error.httpCode || env.api.error);
    res.json({
        name: error.name,
        message: error.message,
        errors: error[`errors`] || [],
    });

    if (isProduction) {
        log.error(error.message);
    } else {
        log.error(error.message);
    }
};
