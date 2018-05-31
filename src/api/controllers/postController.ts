'use strict';

import { NextFunction, Request, Response } from 'express';
import { FileData, Size, UploadedFile } from '../../interfaces';
import * as Busboy from 'busboy';
import { UploadService } from '../services/UploadService';
import { env } from '../../env';
import { Attachment } from '../../database/models/attachment';
import { Post } from '../../database/models/actions/post';
import { Comment } from '../../database/models/actions/comment';
import { AttachmentService } from '../services/AttachmentService';
import { PostService } from '../services/actions/PostService';
import { CommentService } from '../services/actions/CommentService';
import { IAttachmentModel } from '../../interfaces/database';
import { createPostMiddleware } from '../validators';
import { FeedService } from '../services/feed/FeedService';
import { SubscriptionService } from '../services/SubscriptionService';
import { ActionService } from '../services/feed/ActionService';

export class PostController {

    private static instance: PostController;
    private uploadService: UploadService = UploadService.getInstance();
    private attachmentService: AttachmentService = AttachmentService.getInstance();
    private postService: PostService = PostService.getInstance();
    private commentService: CommentService = CommentService.getInstance();
    private feedService: FeedService = FeedService.getInstance();
    private subscriptionService: SubscriptionService = SubscriptionService.getInstance();
    private actionService: ActionService = ActionService.getInstance();

    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): PostController {
        if (!PostController.instance) {
            PostController.instance = new PostController();
        }
        return PostController.instance;
    }

    public find = (req: Request, res: Response, next: NextFunction): void => {
        const postService = this.postService;
        const resources = req.query.resource || null;
        const filter = req.query.filter || null;
        const sort = req.query.sort || null;
        const page = parseInt(req.query.page, 10) || null;
        const perPage = parseInt(req.query.perPage, 10) || null;
        const partial = req.query.partial || false;
        const populate = req.query.populate || null;
        postService.find(page, perPage, resources, sort, filter, partial, populate)
            .then((posts) => {
                res.status(env.api.success).json(posts);
                next();
            }).catch((err: Error) => {
                next(err);
            });
    }

    public getFeed = (req: Request, res: Response, next: NextFunction): void => {
        const userId = req.get('api_key') ? req.query.id : res.locals.user.sub;
        const page = parseInt(req.query.page, 10) || null;
        const populate = req.query.populate || 'actions';
        this.subscriptionService.find(null, null, `subscriber-${userId}`, null, 'subscribable').then(subscriptions => {
            const subscribables = subscriptions.map(value => value.subscribable);
            this.feedService.find(null, 1, { user: userId }).then(feeds => {
                if (feeds.length) {
                    const feed = feeds[0];
                    this.actionService.find(page, 50, {
                        type: 'Post',
                        IsHidden: false,
                        user: { $in: subscribables },
                        _id: { $nin: feed.actions },
                        createdAt: { $gt: feed.updatedAt },
                    }, '-createdAt').then(actions => {
                        const ids = actions.map(val => val._id);
                        feed.actions = ids.concat(feed.actions);
                        if (actions.length < 50) {
                            this.actionService.find(1, 50, {
                                type: 'Post',
                                IsHidden: false,
                                user: { $in: subscribables },
                                _id: { $nin: feed.actions },
                                createdAt: { $lt: feed.updatedAt },
                            }, '-createdAt').then(oldActions => {
                                const oldIds = oldActions.map(value => value._id);
                                feed.actions = feed.actions.concat(oldIds);
                                feed.updatedAt = new Date().toISOString();
                                this.feedService.internalUpdate(feed).then(newFeed => {
                                    if (populate) {
                                        newFeed.populate('actions', (err, actionPopulated) => {
                                            actionPopulated.populate({
                                                path: 'actions.object',
                                                model: 'Post',
                                            }).execPopulate().then(postsPopulated => {
                                                postsPopulated.populate({
                                                    path: 'actions.object.attachments',
                                                    model: 'Attachment',
                                                }).execPopulate().then(attachmentsPopulated => {
                                                    attachmentsPopulated.populate({
                                                        path: 'actions.object.author',
                                                        model: 'User',
                                                    }).execPopulate().then(authorPopulated => {
                                                        authorPopulated.populate({
                                                            path: 'actions.user',
                                                            model: 'User',
                                                        }).execPopulate().then(userPopulated => {
                                                            res.status(env.api.success).json(newFeed);
                                                            next();
                                                        }).catch(e => next(e));
                                                    }).catch(e => next(e));
                                                }).catch(e => next(e));
                                            }).catch(e => next(e));
                                        });
                                    } else {
                                        res.status(env.api.success).json(newFeed);
                                        next();
                                    }
                                }).catch(e => next(e));
                            }).catch(e => next(e));
                        } else {
                            feed.updatedAt = new Date().toISOString();
                            this.feedService.internalUpdate(feed).then(newFeed => {
                                if (populate) {
                                    newFeed.populate('actions', (err, actionPopulated) => {
                                        actionPopulated.populate({
                                            path: 'actions.object',
                                            model: 'Post',
                                        }).execPopulate().then(postsPopulated => {
                                            postsPopulated.populate({
                                                path: 'actions.object.attachments',
                                                model: 'Attachment',
                                            }).execPopulate().then(attachmentsPopulated => {
                                                attachmentsPopulated.populate({
                                                    path: 'actions.object.author',
                                                    model: 'User',
                                                }).execPopulate().then(authorPopulated => {
                                                    authorPopulated.populate({
                                                        path: 'actions.user',
                                                        model: 'User',
                                                    }).execPopulate().then(userPopulated => {
                                                        res.status(env.api.success).json(newFeed);
                                                        next();
                                                    }).catch(e => next(e));
                                                }).catch(e => next(e));
                                            }).catch(e => next(e));
                                        }).catch(e => next(e));
                                    });
                                } else {
                                    res.status(env.api.success).json(newFeed);
                                    next();
                                }
                            }).catch(e => next(e));
                        }
                    }).catch(e => next(e));
                } else { next(new Error('feed not found')); }
            }).catch(e => next(e));
        }).catch(e => next(e));
    }

    public getPreviousActions = (req: Request, res: Response, next: NextFunction): void => {
        const userId = req.get('api_key') ? req.query.id : res.locals.user.sub;
        const page = parseInt(req.query.page, 10) || null;
        this.subscriptionService.find(null, null, `subscriber-${userId}`, null, 'subscribable').then(subscriptions => {
            const subscribables = subscriptions.map(value => value.subscribable);
            this.feedService.find(null, 1, { user: userId }).then(feeds => {
                if (feeds.length) {
                    const feed = feeds[0];
                    this.actionService.find(page, 50, {
                        type: 'Post',
                        IsHidden: false,
                        user: { $in: subscribables },
                        _id: { $nin: feed.actions },
                        createdAt: { $lt: feed.updatedAt },
                    }, '-createdAt').then(actions => {
                        const ids = actions.map(val => val._id);
                        feed.actions = ids.concat(feed.actions);
                        feed.populate('actions', (err, actionPopulated) => {
                            actionPopulated.populate({
                                path: 'actions.object',
                                model: 'Post',
                            }).execPopulate().then(postsPopulated => {
                                postsPopulated.populate({
                                    path: 'actions.object.attachments',
                                    model: 'Attachment',
                                }).execPopulate().then(attachmentsPopulated => {
                                    attachmentsPopulated.populate({
                                        path: 'actions.object.author',
                                        model: 'User',
                                    }).execPopulate().then(authorPopulated => {
                                        authorPopulated.populate({
                                            path: 'actions.user',
                                            model: 'User',
                                        }).execPopulate().then(userPopulated => {
                                            res.status(env.api.success).json(feed);
                                            next();
                                        }).catch(e => next(e));
                                    }).catch(e => next(e));
                                }).catch(e => next(e));
                            }).catch(e => next(e));
                        });
                    });
                }
            }).catch(e => next(e));
        }).catch(e => next(e));
    }

    public create = (req: Request, res: Response, next: NextFunction): void => {
        let busboy: busboy.Busboy;
        const answer: { files: UploadedFile[], fields: { [key: string]: string } } = { files: [], fields: {} };
        const promisesUpload: Array<Promise<UploadedFile>> = [];
        try {
            busboy = new Busboy({
                headers: req.headers,
                limits: { files: 20, fileSize: 1024 * 1024 * 100 },
                preservePath: true,
            });
            busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                if (!filename) { file.resume(); }
                const params: FileData = { originalname: filename, encoding, mimetype, fieldname };
                if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(filename)) {
                    const sizes: Size[] = [{ name: 'big', prefix: 'big-', size: 1920 },
                    { name: 'medium', prefix: 'medium-', size: 1280 },
                    { name: 'small', prefix: 'small-', size: 720 },
                    { name: 'low', prefix: 'low-', size: 320 }];
                    promisesUpload.push(this.uploadService.uploadSingle(file, params, res.locals.user.sub, sizes));
                } else if ((/\.(pdf|doc|docx)$/i).test(filename)) {
                    promisesUpload.push(this.uploadService.uploadSingle(file, params, res.locals.user.sub));
                } else { file.resume(); }
            });
            busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => answer.fields[fieldname] = val);
            busboy.on('error', (err) => { next(err); });
            busboy.on('partsLimit', () => { next(new Error('upload parts limit reached')); });
            busboy.on('filesLimit', () => { next(new Error('upload files limit reached')); });
            busboy.on('fieldsLimit', () => { next(new Error('upload fields limit reached')); });
            busboy.on('finish', () => {
                req.unpipe(busboy);
                busboy.removeAllListeners();
                const hidden = (answer.fields.hidden && answer.fields.hidden === 'true') || false;
                const userId = req.get('api_key') ? answer.fields.userId : res.locals.user.sub;
                const validator = createPostMiddleware(answer.fields.title, hidden, userId);
                if (validator === true) {
                    const post = new Post({ title: answer.fields.title, author: userId, attachments: [], comments: null });
                    const comments = new Comment({ discussionId: post._id });
                    this.commentService.create(comments).then(comment => {
                        post.comments = comments._id;
                        if (promisesUpload.length > 0) {
                            Promise.all(promisesUpload).then((values) => {
                                const promisesAttachments: Array<Promise<IAttachmentModel>> = [];
                                answer.files = values;
                                answer.files.forEach(value => {
                                    let type = 'book';
                                    if (value.params.mimetype && value.params.mimetype.startsWith('image')) {
                                        type = 'photo';
                                    }
                                    const attachment = new Attachment({ userId, relatedId: post._id, urls: value.urls, type });
                                    promisesAttachments.push(this.attachmentService.create(attachment, userId));
                                });
                                Promise.all(promisesAttachments).then((attachments) => {
                                    attachments.forEach(attachment => {
                                        post.attachments.push(attachment._id);
                                    });
                                    this.postService.create(post, userId, null, { hidden }).then((newPost) => {
                                        res.status(env.api.success).json(newPost);
                                        next();
                                    }).catch(e => next(e));
                                }).catch(e => next(e));
                            }).catch((err) => {
                                next(err);
                            });
                        } else {
                            this.postService.create(post, userId).then((newPost) => {
                                res.status(env.api.success).json(newPost);
                                next();
                            }).catch(e => next(e));
                        }
                    }).catch(e => next(e));
                } else {
                    next(validator);
                }
            });
            req.pipe(busboy);
        } catch (err) {
            return next(err);
        }

    }

    // public delete = (req: Request, res: Response, next: NextFunction): void => {
    //     const chatService = this.chatService;
    //     chatService.delete(req.body.id)
    //         .then((newConversation) => {
    //             res.status(env.api.success).json(newConversation);
    //             next();
    //         }).catch((err: Error) => {
    //             const e = new HttpError(401, err.message);
    //             next(e);
    //         });
    // }
    // public deleteMessage = (req: Request, res: Response, next: NextFunction): void => {
    //     const chatService = this.chatService;
    //     chatService.deleteMessage(req.body.id)
    //         .then((deletedMessage) => {
    //             res.status(env.api.success).json(deletedMessage);
    //             next();
    //         }).catch((err: Error) => {
    //             const e = new HttpError(401, err.message);
    //             next(e);
    //         });
    // }

}
