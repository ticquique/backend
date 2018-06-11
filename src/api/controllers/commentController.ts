import { CommentService } from '../services/actions/CommentService';
import { NextFunction, Request, Response } from 'express';
import { env } from '../../env';
import { HttpError } from '../../interfaces/errors/HttpError';

export class CommentController {

    private static instance: CommentController;
    private commentService: CommentService = CommentService.getInstance();
    private constructor() {}
    // tslint:disable-next-line:member-ordering
    public static getInstance(): CommentController {
        if (!CommentController.instance) {
            CommentController.instance = new CommentController();
        }
        return CommentController.instance;
    }

    public find = (req: Request, res: Response, next: NextFunction): void => {
        const commentService = this.commentService;
        const resources = req.query.resource || null;
        const filter = req.query.filter || null;
        const sort = req.query.sort || null;
        const page = parseInt(req.query.page, 10) || null;
        const perPage = parseInt(req.query.perPage, 10) || null;
        const partial = req.query.partial || null;
        const populate = req.query.populate || false;
        commentService.find(page, perPage, resources, sort, filter, partial, populate)
            .then((subscriptions) => {
                res.status(env.api.success).json(subscriptions);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

    public newComment = (req: Request, res: Response, next: NextFunction): void => {
        const commentService = this.commentService;
        const discussionId = req.body.discussionId || null;
        const text = req.body.text || null;
        const author: {name: string, id: string} = {
            name: req.body.name,
            id: req.get('api_key') ? req.body.user : res.locals.user.sub,
        };
        commentService.addComment(discussionId, text, author)
            .then((newComment) => {
                res.status(env.api.success).json(newComment);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }
}
