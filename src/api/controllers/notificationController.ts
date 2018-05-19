import { NotificationService } from './../services/feed/NotificationService';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../interfaces/errors/HttpError';
import { env } from '../../env';

export class NotificationController {

    private static instance: NotificationController;
    public notificationService: NotificationService = NotificationService.getInstance();
    private constructor() {}
    // tslint:disable-next-line:member-ordering
    public static getInstance(): NotificationController {
        if (!NotificationController.instance) {
            NotificationController.instance = new NotificationController();
        }
        return NotificationController.instance;
    }

    public find = (req: Request, res: Response, next: NextFunction): void => {
        let resources = null;
        if (req.get('api_key')) {
            resources = req.query.resource || null;
        } else {
            if (req.query.resource && typeof req.query.resource === 'string') {
                const splitted = req.query.resource.split(';');
                const aux: string[] = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < splitted.length; i++) {
                    const element: string[] = splitted[i].split('-');
                    if (element.length === 2) {
                        if (element[0] !== 'user') {
                            aux.push(element.join('-'));
                        }
                    } else {
                        const e = new HttpError(401, 'Invalid resource query');
                        next(e);
                    }
                }
                aux.push(`user-${res.locals.user.sub}`);
                resources = aux.join(';');
            } else if (req.query.resource) {
                resources = req.query.resource;
                resources.user = res.locals.user.sub;
            } else {
                resources = 'user-' + res.locals.user.sub;
            }
        }
        const populate = req.query.populate || null;
        const filter = req.query.filter || null;
        const sort = req.query.sort || null;
        const page = parseInt(req.query.page, 10) || null;
        const perPage = parseInt(req.query.perPage, 10) || null;
        const partial = req.query.partial || null;
        const view = req.query.view || null;
        const actionFilter = req.query.actionFilter || null;
        const populateAction = req.query.populateAction || null;
        this.notificationService.find(page, perPage, resources, sort, filter, partial, populate, view, actionFilter, populateAction)
            .then((subscriptions) => {
                res.status(env.api.success).json(subscriptions);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }
}
