'use strict';

import { NextFunction, Request, Response } from 'express';
import { FileUploaded, FileData } from '../../interfaces';
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
        const partial = req.query.partial || true;
        postService.find(page, perPage, resources, sort, filter, partial)
            .then((posts) => {
                res.status(env.api.success).json(posts);
                next();
            }).catch((err: Error) => {
                next(err);
            });
    }

    public getFeed = (req: Request, res: Response, next: NextFunction): void => {
        const userId = req.get('api_key') ? req.query.id : res.locals.user.sub;
        const page = req.query.page || 1;
        this.subscriptionService.find(null, null, `subscriber-${userId}`, null, `subscribable`).then((subscriptions) => {
            const subscribables = subscriptions.map(value => value.subscribable);
            this.feedService.find(null, 1, { user: userId }).then((feeds) => {
                if (feeds.length > 0) {
                    this.actionService.find(page, 50, {
                        type: 'post',
                        isHidden: false,
                        user: { $in: subscribables },
                        _id: { $nin: feeds[0].actions },
                        createdAt: { $gt: feeds[0].updatedAt },
                    }, '-createdAt').then(actions => {
                        const actionsId: string[] = actions.map(value => value._id);
                        feeds[0].actions = actionsId.concat(feeds[0].actions);
                        if (actions.length < 50) {
                            this.actionService.find(page, 50, {
                                type: 'post',
                                isHidden: false,
                                user: { $in: subscribables },
                                _id: { $nin: feeds[0].actions },
                                createdAt: { $lt: feeds[0].updatedAt },
                            }, '-createdAt').then(prevActions => {
                                feeds[0].actions = feeds[0].actions.concat(prevActions.map(value => value._id));
                                feeds[0].updatedAt = new Date().toISOString();
                                this.feedService.create(feeds[0]).then(newFeed => {
                                    res.status(env.api.success).json(newFeed);
                                    next();
                                }).catch(e => next(e));
                            });
                        } else {
                            feeds[0].updatedAt = new Date().toISOString();
                            this.feedService.create(feeds[0]).catch(e => next(e)).then(newFeed => {
                                res.status(env.api.success).json(newFeed);
                                next();
                            });
                        }
                    }).catch(e => next(e));
                } else { next(new Error('feed not found')); }
            }).catch(e => next(e));
        }).catch(err => next(err));
    }

    public create = (req: Request, res: Response, next: NextFunction): void => {
        let busboy: busboy.Busboy;
        const answer: { files: FileUploaded[], [key: string]: string | FileUploaded[] } = { files: [] };
        const promisesUpload: Array<Promise<FileUploaded>> = [];
        try {
            busboy = new Busboy({
                headers: req.headers,
                limits: { files: 20, fileSize: 1024 * 1024 * 100 },
                preservePath: true,
            });
            busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                if (!filename) { file.resume(); }
                if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(filename)) {
                    const params: FileData = { originalname: filename, encoding, mimetype, fieldname };
                    promisesUpload.push(this.uploadService.uploadFile(file, params, res.locals.user.sub));
                } else { file.resume(); }
            });
            busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
                answer[fieldname] = val;
            });
            busboy.on('error', (err) => { next(err); });
            busboy.on('partsLimit', () => { next(new Error('upload parts limit reached')); });
            busboy.on('filesLimit', () => { next(new Error('upload files limit reached')); });
            busboy.on('fieldsLimit', () => { next(new Error('upload fields limit reached')); });
            busboy.on('finish', () => {
                req.unpipe(busboy);
                busboy.removeAllListeners();
                const hidden = answer.hidden || 'false';
                const hiddenVal = (hidden === 'true');
                let userId = null;
                if (req.get('api_key')) { userId = answer.userId; } else { userId = res.locals.user.sub; }
                const validator = createPostMiddleware(answer.title, hidden, userId);
                if (validator === true) {
                    const post = new Post({ title: answer.title, author: userId, attachments: [], comments: null });
                    const comments = new Comment({ discussionId: post._id });
                    post['comments'] = comments._id;
                    this.commentService.create(comments).then().catch(e => next(e));
                    if (promisesUpload.length > 0) {
                        Promise.all(promisesUpload).then((values) => {
                            const promisesAttachments: Array<Promise<IAttachmentModel>> = [];
                            answer.files = values;
                            answer.files.forEach(value => {
                                const attachment = new Attachment({ userId, relatedId: post._id, urls: value.urls });
                                promisesAttachments.push(this.attachmentService.create(attachment, userId));
                            });
                            Promise.all(promisesAttachments).then((attachments) => {
                                attachments.forEach(attachment => {
                                    post.attachments.push(attachment._id);
                                });
                                this.postService.create(post, userId, null, {hidden: hiddenVal}).then((newPost) => {
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
