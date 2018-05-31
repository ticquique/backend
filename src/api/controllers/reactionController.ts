'use strict';

import { NextFunction, Request, Response } from 'express';
import { ReactionService } from '../services/actions/ReactionService';
import { env } from '../../env';
import { HttpError } from '../../interfaces/errors/HttpError';
import { Reaction } from '../../database/models/actions/reaction';

export class ReactionController {

    private static instance: ReactionController;
    private reactionService: ReactionService = ReactionService.getInstance();
    private constructor() {}
    // tslint:disable-next-line:member-ordering
    public static getInstance(): ReactionController {
        if (!ReactionController.instance) {
            ReactionController.instance = new ReactionController();
        }
        return ReactionController.instance;
    }

    public find = (req: Request, res: Response, next: NextFunction): void => {
        const reactionService = this.reactionService;
        const resources = req.query.resource || null;
        const filter = req.query.filter || null;
        const sort = req.query.sort || null;
        const page = parseInt(req.query.page, 10) || null;
        const perPage = parseInt(req.query.perPage, 10) || null;
        const partial = req.query.partial || null;
        const populate = req.query.populate || false;
        reactionService.find(page, perPage, resources, sort, filter, partial, populate)
            .then((subscriptions) => {
                res.status(env.api.success).json(subscriptions);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

    public react = (req: Request, res: Response, next: NextFunction): void => {
        const reactionService = this.reactionService;
        const reaction = new Reaction(req.body);
        const user = req.query.id || null;
        const hidden = req.query.hidden || false;
        const userId = req.get('api_key') ? user : res.locals.user.sub;
        reactionService.react(reaction, userId, null, {hidden})
            .then((newReaction) => {
                res.status(env.api.success).json(newReaction);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }
}
