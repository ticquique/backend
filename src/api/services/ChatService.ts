import { ActionService } from './feed/ActionService';
import { EventDispatcher } from 'event-dispatch';
import * as mongoose from 'mongoose';
import * as io from 'socket.io';
import { Conversation } from '../../database/models/chat/conversation';
import { Message } from '../../database/models/chat/message';
import { env } from '../../env';
import { IConversationModel, IMessage, IMessageModel, IUserModel, IActionModel } from '../../interfaces/database';
import { HttpError } from '../../interfaces/errors/HttpError';
import { Logger } from '../../lib/logger';
import { events } from '../subscribers/events';
import { validateMessage, validateNewConversation } from '../validators';
import { AuthService, AuthToken } from './AuthService';
import { UserService } from './UserService';
import { Action } from '../../database/models/feed/action';
import { NotificationService } from './feed/NotificationService';
interface FindAction {
    [value: string]: any;
}
interface Client {
    socket?: io.Socket;
    user?: IUserModel;
}

export class ChatService {

    private static instance: ChatService;
    public server: io.Server;
    public client: io.Socket;
    private eventDispatcher: EventDispatcher;
    private logger: Logger;
    private clientList: Client[] = [];
    private authService: AuthService;
    private userService: UserService;
    private actionService: ActionService;
    private notificationService: NotificationService;

    private constructor(ioServer?: io.Server) {
        if (ioServer) {
            this.authService = AuthService.getInstance();
            this.userService = UserService.getInstance();
            this.actionService = ActionService.getInstance();
            this.notificationService = NotificationService.getInstance();
            this.logger = new Logger(__dirname);
            this.server = ioServer;
            this.onConnect(this.listeners);
        }
    }

    // tslint:disable-next-line:member-ordering
    public static getInstance(ioServer?: io.Server): ChatService {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService(ioServer || null);
        }
        return ChatService.instance;
    }

    // tslint:disable-next-line:max-line-length
    public find = (page: number = 1, perPage: number = 200, resource?: string | FindAction, sort?: string, filter?: string, partial?: boolean, populate?: any[] | any): Promise<IConversationModel[]> => {
        return new Promise<IConversationModel[]>((resolve, reject) => {
            let query: mongoose.Query<IConversationModel[]> = null;
            if (resource && typeof resource === 'string') {
                const resources = resource.split(';');
                const resourcesQuery: any = {};
                resources.forEach((value) => {
                    const elem = value.split('-');
                    if (elem.length === 2) {
                        // tslint:disable-next-line:max-line-length
                        if (elem[0] === 'participants') {
                            let arrayParticipants = [];
                            arrayParticipants = arrayParticipants.concat(elem[1].split(','));
                            resourcesQuery[elem[0]] = { $all: arrayParticipants };
                        } else if (partial && elem[0] !== '_id') {
                            resourcesQuery[elem[0]] = new RegExp('^' + elem[1]);
                        } else { resourcesQuery[elem[0]] = elem[1]; }
                    } else {
                        reject(new Error('Invalid resource query'));
                    }
                });
                query = Conversation.find(resourcesQuery);
            } else if (resource && typeof resource !== 'string') {
                query = Conversation.find(resource);
                if (resource.id) {
                    query.limit(1);
                } else {
                    if (perPage) {
                        query.limit(perPage);
                    }
                    if (page && perPage) {
                        query.skip((page - 1) * perPage);
                    }
                }
            } else {
                query = Conversation.find({});
                if (perPage) {
                    query.limit(perPage);
                }
                if (page && perPage) {
                    query.skip((page - 1) * perPage);
                }
            }
            if (filter) {
                const filters = filter.split(',');
                let arrayFilter = '';
                filters.forEach((filt) => {
                    if (filt.startsWith('-')) {
                        filt = filt.substr(1);
                        arrayFilter = arrayFilter + ` -${filt}`;
                    } else {
                        arrayFilter = arrayFilter + ` ${filt}`;
                    }
                });
                query.select(arrayFilter);
            }
            if (sort) {
                const array = sort.split(',');
                const arraySort = [];
                array.forEach(order => {
                    if (order.startsWith('-')) {
                        order = order.substr(1);
                        arraySort.push([order, -1]);
                    } else {
                        arraySort.push([order, 1]);
                    }
                });
                query.sort(arraySort);
            }
            if (populate) {
                if (populate instanceof Array) {
                    populate.forEach(populatedField => {
                        query.populate(populatedField);
                    });
                } else if (typeof populate === 'string') {
                    const array = populate.split(',');
                    array.forEach(populatedField => {
                        query.populate(populatedField);
                    });
                } else {
                    query.populate(populate);
                }
            }
            query.exec((err: Error, conversations) => {
                if (err) { reject(err); } else { resolve(conversations); }
            });
        });
    }

    public create = (chat: IConversationModel, message: IMessageModel, userId?: string): Promise<IConversationModel> => {
        this.getDispatcherService();
        return new Promise<IConversationModel>((resolve, reject) => {
            if (userId) {
                if (chat.participants.indexOf(userId) === -1) {
                    reject(new HttpError(env.api.error, 'You must be a participant'));
                }
            }
            this.find(null, null, `participants-${chat.participants.join()}`, null, null).then((conversation) => {
                if (!conversation.length) {
                    message.conversation = chat._id;
                    chat.save();
                } else {
                    message.conversation = conversation[0]._id;
                }
                this.eventDispatcher.dispatch(events.chat.created, chat);
                message.save();
                resolve(chat);
            }).catch((err: mongoose.Error) => {
                reject(err);
            });
        });
    }

    public delete = (id: string): Promise<IConversationModel> => {
        return new Promise<any>((resolve, reject) => {
            Conversation.remove({ _id: id }, (err) => {
                if (err) { reject(err); } else {
                    Message.remove({ conversation: id }, (error) => {
                        if (error) { reject(error); } else {
                            resolve('Correctly deleted conversation');
                        }
                    });
                }
            });
        });
    }

    public deleteMessage = (id: string): Promise<IConversationModel> => {
        return new Promise<any>((resolve, reject) => {
            Message.remove({ _id: id }, (error) => {
                if (error) { reject(error); } else {
                    resolve('Correctly deleted message');
                }
            });
        });
    }

    // tslint:disable-next-line:max-line-length
    public findMessages = (page: number = 1, perPage: number = 200, resource?: string, sort?: string, filter?: string, partial?: boolean, userId?: string, populate?: any[] | any): Promise<IMessageModel[]> => {
        return new Promise<IMessageModel[]>((resolve, reject) => {
            let query: mongoose.Query<IMessageModel[]> = null;
            if (resource) {
                const resources = resource.split(';');
                const resourcesQuery: any = {};
                resources.forEach((value) => {
                    const elem = value.split('-');
                    if (elem.length === 2) {
                        if (partial) { resourcesQuery[elem[0]] = new RegExp('^' + elem[1]); } else { resourcesQuery[elem[0]] = elem[1]; }
                    } else {
                        reject(new Error('Incorrect reource query'));
                    }
                });
                query = Message.find(resourcesQuery);
                if (resourcesQuery._id) {
                    query.limit(1);
                } else {
                    if (perPage) {
                        query.limit(perPage);
                    }
                    if (page && perPage) {
                        query.skip((page - 1) * perPage);
                    }
                }
            } else {
                query = Message.find({});
                if (perPage) {
                    query.limit(perPage);
                }
                if (page && perPage) {
                    query.skip((page - 1) * perPage);
                }
            }
            if (filter) {
                const filters = filter.split(',');
                let arrayFilter = '';
                filters.forEach((filt) => {
                    if (filt.startsWith('-')) {
                        filt = filt.substr(1);
                        arrayFilter = arrayFilter + ` -${filt}`;
                    } else {
                        arrayFilter = arrayFilter + ` ${filt}`;
                    }
                });
                query.select(arrayFilter);
            }
            if (sort) {
                const array = sort.split(',');
                const arraySort = [];
                array.forEach(order => {
                    if (order.startsWith('-')) {
                        order = order.substr(1);
                        arraySort.push([order, -1]);
                    } else {
                        arraySort.push([order, 1]);
                    }
                });
                query.sort(arraySort);
            }
            if (populate) {
                if (populate instanceof Array) {
                    populate.forEach(populatedField => {
                        query.populate(populatedField);
                    });
                } else if (typeof populate === 'string') {
                    const array = populate.split(',');
                    array.forEach(populatedField => {
                        query.populate(populatedField);
                    });
                } else {
                    query.populate(populate);
                }
            }
            query.exec((err: Error, messages) => {
                if (err) { reject(err); } else {
                    resolve(messages);
                }
            });
        });
    }

    // EMITERS

    public emitNotification = async (action: IActionModel, to: string) => {
        const client = await this.findClient(null, to);
        if (client && client.length > 0 && this.client) {
            client.map(val => this.server.to(val.socket.id).emit('notif', action));
        } else {
            action.notified = false;
            action.save();
        }
    }

    // LISTENERS

    private listeners = (error?: Error, socket?: io.Socket): void => {
        if (!error) {
            this.onNewChat(socket);
            this.onSendMessage(socket);
            this.onMessage(socket);
        }
        this.onDisconect(socket);
    }

    private onNewChat = (socket: io.Socket) => {
        socket.on('newChat', async (data: { id: string[], message: IMessage }) => {
            if (validateNewConversation({ participants: data.id, message: data.message })) {
                const cli = await this.findClient(socket.id);
                const user: IUserModel = cli[0].user;
                const participants = data.id.concat(user.id);
                this.createConversation(participants).then((value: IConversationModel) => {
                    data.message['conversation'] = value.id;
                    data.message['author'] = user;
                    const message = new Message(data.message);
                    message.save((err: mongoose.Error, newMessage) => {
                        if (err) {
                            this.logger.error(err.message);
                        } else {
                            participants.forEach(async participant => {
                                const client = await this.findClient(null, participant);
                                if (client.length > 0) {
                                    client.map(val => {
                                        val.socket.join(newMessage.conversation);
                                    });
                                } else {
                                    const action: IActionModel = new Action({
                                        user: newMessage.author, type: 'Message', object: newMessage.conversation,
                                        relevancy: 0, IsHidden: false, notified: false,
                                    });
                                    this.actionService.create(action).then(val => {
                                        this.notificationService.update([val], participant).then().catch(e => this.logger.error(e));
                                    }).catch(e => this.logger.error(e));
                                }
                            });
                            setTimeout(() => {
                                this.server.of('/').to(newMessage.conversation).emit('newMessage', message);
                            }, 100);
                        }
                    });
                }).catch((err: Error) => { this.logger.error(err.message); });
            } else { this.logger.error('Invalid arguments'); }
        });
    }

    // NOT WORKING
    private onMessage = (socket: io.Socket) => {
        socket.on('message', async (data: IMessage) => {
            const findCli = await this.findClient(socket.id);
            this.logger.info(`User ${findCli[0].user.username} has a new message`);
        });
    }

    private onSendMessage = (socket: io.Socket) => {
        socket.on('sendMessage', async (data: IMessage) => {
            if (validateMessage(data)) {
                const findCli = await this.findClient(socket.id);
                const user: IUserModel = findCli[0].user;
                data['author'] = user;
                const message = new Message(data);
                message.save((err: mongoose.Error, newMessage) => {
                    if (err) {
                        this.logger.error(err.message);
                    } else {
                        this.find(null, null, { _id: newMessage.conversation }).then(conversation => {
                            if (conversation && conversation.length) {
                                conversation[0].participants.forEach(async participant => {
                                    const clients = await this.findClient(null, participant);
                                    if (clients.length === 0) {
                                        const action: IActionModel = new Action({
                                            user: newMessage.author, type: 'Message', object: newMessage.conversation,
                                            relevancy: 0, IsHidden: false, notified: false,
                                        });
                                        this.actionService.create(action).then(value => {
                                            this.notificationService.update([value], participant).then().catch(e => this.logger.error(e));
                                        }).catch(e => this.logger.error(e));
                                    }
                                });
                            }
                        }).catch(e => console.log(e));
                        this.server.in(newMessage.conversation).emit('newMessage', newMessage);
                    }
                });
            } else { this.logger.error('Invalid arguments'); }
        });
    }

    private onConnect = (cb?: (err?: Error, client?: io.Socket) => void) => {
        this.server.on('connection', (socket) => {
            let token = socket.handshake.query.token || null;
            if (token) {
                token = `Bearer ${token}`;
                this.authService.validateToken(token).then((value: AuthToken) => {
                    this.userService.find(null, null, `_id-${value.sub}`).then(user => {
                        if (user.length) {
                            const client: Client = { socket, user: user[0] };
                            this.clientList.push(client);
                            this.find(null, null, `participants-${user[0].id}`, null, null, true)
                                .then(conversations => {
                                    conversations.forEach(conversation => {
                                        socket.join(conversation.id);
                                    });
                                    this.client = socket;
                                    this.logger.socket(`User ${user[0].username} with id ${user[0].id} connected ${socket.id}`);
                                    cb(null, socket);
                                })
                                .catch(error => {
                                    cb(error, socket);
                                    socket.disconnect(true);
                                });
                        } else {
                            cb(new Error('User not found'), socket);
                            socket.disconnect(true);
                        }
                    }).catch((err: Error) => {
                        cb(err, socket);
                        socket.disconnect(true);
                    });
                }).catch((err: Error) => {
                    cb(new Error('Incorrect token'), socket);
                    socket.disconnect(true);
                });
            } else {
                cb(new Error('No token provided'), socket);
                socket.disconnect(true);
            }
        });
    }

    private onDisconect = async (socket?: io.Socket) => {
        const sock = await this.findClient(socket.id);
        if (sock && sock.length) {
            const user = sock[0].user;
            socket.on('disconnect', () => {
                this.clientList = this.clientList.filter(val => val.socket.id.toString() !== socket.id.toString());
                this.logger.socket(`User ${user.username} with id ${user.id} disconected`);
            });
        } else {
            socket.on('disconnect', () => {
                this.logger.socket(`Unsuccesfull connexion disconected`);
            });
        }
    }

    private findClient = (socketId?: string, participant?: string) => {
        return new Promise<Client[]>((resolve, reject) => {
            let res = undefined;
            if (socketId) {
                res = this.clientList.filter(value => value.socket.id === socketId);
            } else {
                res = this.clientList.filter(value => participant.toString() === value.user._id.toString());
            }
            resolve(res);
        });
    }

    private createConversation = (participants: string[]): Promise<IConversationModel> => {
        return new Promise((resolve, reject) => {
            this.getDispatcherService();
            this.find(null, null, `participants-${participants.join()}`)
                .then(value => {
                    if (value.length) { resolve(value[0]); } else {
                        const conversation = new Conversation({ participants });
                        conversation.save((err, newConversation) => {
                            if (err) { reject(err); } else {
                                this.eventDispatcher.dispatch(events.chat.created, newConversation);
                                resolve(newConversation);
                            }
                        });
                    }
                })
                .catch((err: Error) => {
                    reject(err.message);
                });
        });
    }

    private getDispatcherService = (): EventDispatcher => {
        return this.eventDispatcher || (this.eventDispatcher = new EventDispatcher());
    }

}
