'use strict';

import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { Conversation } from '../../database/models/chat/conversation';
import { Message } from '../../database/models/chat/message';
import { env } from '../../env';
import { HttpError } from '../../interfaces/errors/HttpError';
import { ChatService } from '../services/ChatService';

export class ChatController {

    private static instance: ChatController;
    private chatService: ChatService = ChatService.getInstance();
    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): ChatController {
        if (!ChatController.instance) {
            ChatController.instance = new ChatController();
        }
        return ChatController.instance;
    }

    public find = (req: Request, res: Response, next: NextFunction): void => {
        const chatService = this.chatService;
        let resources = null;
        if (req.get('api_key')) {
            resources = req.query.resource || null;
        } else {
            if (req.query.resource) {
                const splitted = req.query.resource.split(';');
                const aux: string[] = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < splitted.length; i++) {
                    const element: string[] = splitted[i].split('-');
                    if (element.length === 2) {
                        if (element[0] === 'participants') {
                            element[1] = element[1] + ',' +  res.locals.user.sub;
                        }
                        aux.push(element.join('-'));
                    } else {
                        const e = new HttpError(401, 'Invalid resource query');
                        next(e);
                    }
                }
                resources = aux.join(';');
            } else {
                resources = 'participants-' + res.locals.user.sub;
            }
        }
        const filter = req.query.filter || null;
        const sort = req.query.sort || null;
        const page = parseInt(req.query.page, 10) || null;
        const perPage = parseInt(req.query.perPage, 10) || null;
        const partial = req.query.partial || false;
        const populate = req.query.populate || false;
        chatService.find(page, perPage, resources, sort, filter, partial, populate)
            .then((chats) => {
                res.status(env.api.success).json(chats);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

    public findMessages = (req: Request, res: Response, next: NextFunction): void => {
        const chatService = this.chatService;
        const resources = req.query.resource || null;
        const filter = req.query.filter || null;
        const sort = req.query.sort || null;
        const page = parseInt(req.query.page, 10) || null;
        const perPage = parseInt(req.query.perPage, 10) || null;
        const partial = req.query.partial || null;
        const user = req.query.id || null;
        const populate = req.query.populate || false;
        const userId = req.get('api_key') ? user : res.locals.user.sub;
        chatService.findMessages(page, perPage, resources, sort, filter, partial, userId, populate)
            .then((chats) => {
                res.status(env.api.success).json(chats);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

    public create = (req: Request, res: Response, next: NextFunction): void => {
        const chatService = this.chatService;
        const conversation = new Conversation(req.body.conversation);
        const message = new Message(req.body.message);
        const user = req.query.id || null;
        const userId = req.get('api_key') ? user : res.locals.user.sub;
        chatService.create(conversation, message, userId)
            .then((newConversation) => {
                res.status(env.api.success).json(newConversation);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }
    public delete = (req: Request, res: Response, next: NextFunction): void => {
        const chatService = this.chatService;
        chatService.delete(req.body.id)
            .then((newConversation) => {
                res.status(env.api.success).json(newConversation);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }
    public deleteMessage = (req: Request, res: Response, next: NextFunction): void => {
        const chatService = this.chatService;
        chatService.deleteMessage(req.body.id)
            .then((deletedMessage) => {
                res.status(env.api.success).json(deletedMessage);
                next();
            }).catch((err: Error) => {
                const e = new HttpError(401, err.message);
                next(e);
            });
    }

}
