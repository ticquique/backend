
'use strict';
import { TagService } from '../services/tagService';
import { Request, Response, NextFunction } from 'express';
import { env } from '../../env';
import { HttpError } from '../../interfaces/errors/HttpError';

export class TagController {

    private static instance: TagController;
    private tagService: TagService = TagService.getInstance();
    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): TagController {
        if (!TagController.instance) {
            TagController.instance = new TagController();
        }
        return TagController.instance;
    }

    public find = (req: Request, res: Response, next: NextFunction): void => {
        const tagService = this.tagService;
        const resources = req.query.resource || null;
        const filter = req.query.filter || null;
        const sort = req.query.sort || null;
        const page = parseInt(req.query.page, 10) || null;
        const perPage = parseInt(req.query.perPage, 10) || null;
        const partial = req.query.partial || null;
        const populate = req.query.populate || null;
        tagService.find(page, perPage, resources, sort, filter, partial, populate)
            .then((subscriptions) => {
                res.status(env.api.success).json(subscriptions);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }
}
