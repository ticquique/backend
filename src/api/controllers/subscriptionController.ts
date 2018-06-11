'use strict';
import { NextFunction, Request, Response } from 'express';
import { Subscription } from '../../database/models/subscription';
import { env } from '../../env';
import { HttpError } from '../../interfaces/errors/HttpError';
import { SubscriptionService } from '../services/SubscriptionService';

export class SubscriptionController {

    private static instance: SubscriptionController;
    private subscriptionService: SubscriptionService = SubscriptionService.getInstance();
    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): SubscriptionController {
        if (!SubscriptionController.instance) {
            SubscriptionController.instance = new SubscriptionController();
        }
        return SubscriptionController.instance;
    }

    public find = (req: Request, res: Response, next: NextFunction): void => {
        const subscriptionService = this.subscriptionService;
        const resources = req.query.resource || null;
        const filter = req.query.filter || null;
        const sort = req.query.sort || null;
        const page = parseInt(req.query.page, 10) || null;
        const perPage = parseInt(req.query.perPage, 10) || null;
        const partial = req.query.partial || null;
        const populate = req.query.populate || null;
        subscriptionService.find(page, perPage, resources, sort, filter, partial, populate)
            .then((subscriptions) => {
                res.status(env.api.success).json(subscriptions);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

    public create = (req: Request, res: Response, next: NextFunction): void => {
        const subscriptionService = this.subscriptionService;
        let subscriber = null;
        if (req.get('api_key')) { subscriber = req.body.subscriber; } else { subscriber = res.locals.user.sub; }
        const populate = req.body.populate || null;
        const subscriptionData = {subscriber, subscribable: req.body.subscribable };
        const subscription = new Subscription(subscriptionData);
        subscriptionService.create(subscription, { hidden: false }, populate)
            .then((newSubscription) => {
                res.status(env.api.success).json(newSubscription);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

    public delete = (req: Request, res: Response, next: NextFunction): void => {
        const subscriptionService = this.subscriptionService;
        const userId = req.get('api_key') ? req.body.subscribable : res.locals.user.sub;
        subscriptionService.delete(req.body.subscription, userId)
            .then((user) => {
                res.status(env.api.success).json(user);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

}
