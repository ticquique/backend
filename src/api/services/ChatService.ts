import { EventDispatcher } from 'event-dispatch';
import * as mongoose from 'mongoose';
import * as io from 'socket.io';
import { Conversation } from '../../database/models/chat/conversation';
import { Message } from '../../database/models/chat/message';
import { env } from '../../env';
import { IConversationModel, IMessage, IMessageModel, IUserModel } from '../../interfaces/database';
import { HttpError } from '../../interfaces/errors/HttpError';
import { Logger } from '../../lib/logger';
import { events } from '../subscribers/events';
import { validateMessage, validateNewConversation } from '../validators';
import { AuthService, AuthToken } from './AuthService';
import { UserService } from './UserService';

interface Client {
    socket?: io.Socket;
    user?: IUserModel;
}

export class ChatService {

    private static instance: ChatService;
    public server: io.Server;
    private eventDispatcher: EventDispatcher;
    private logger: Logger;
    private clientList: Client[] = [];
    private authService: AuthService;
    private userService: UserService;

    private constructor(ioServer?: io.Server) {
        if (ioServer) {
            this.authService = AuthService.getInstance();
            this.userService = UserService.getInstance();
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
    public find = (page: number = 1, perPage: number = 200, resource?: string, sort?: string, filter?: string, partial?: boolean): Promise<IConversationModel[]> => {
        return new Promise<IConversationModel[]>((resolve, reject) => {
            let query: mongoose.Query<IConversationModel[]> = null;
            if (resource) {
                const resources = resource.split(';');
                const resourcesQuery: any = {};
                resources.forEach((value) => {
                    const elem = value.split('-');
                    if (elem.length === 2) {
                        // tslint:disable-next-line:max-line-length
                        if (elem[0] === 'participants') {
                            let arrayParticipants = [];
                            arrayParticipants = arrayParticipants.concat( elem[1].split(','));
                            if (partial) {
                                resourcesQuery[elem[0]] = { $all: arrayParticipants };
                            } else {
                                resourcesQuery[elem[0]] = { $size: arrayParticipants.length, $all: arrayParticipants };
                            }
                        } else if (partial) { resourcesQuery[elem[0]] = new RegExp('^' + elem[1]); } else { resourcesQuery[elem[0]] = elem[1]; }
                    } else {
                        reject(new Error('Invalid resource query'));
                    }
                });
                query = Conversation.find(resourcesQuery);
            } else {
                query = Conversation.find({});
            }
            if (perPage) {
                query.limit(perPage);
            }
            if (page && perPage) {
                query.skip((page - 1) * perPage);
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
    public findMessages = (page: number = 1, perPage: number = 200, resource?: string, sort?: string, filter?: string, partial?: boolean, userId?: string): Promise<IMessageModel[]> => {
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
            if (userId) {
                query.where('author', userId);
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
            query.exec((err: Error, messages) => {
                if (err) { reject(err); } else {
                    resolve(messages);
                }
            });
        });
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
        socket.on('newChat', (data: { id: string[], message: IMessage }) => {
            if (validateNewConversation({ participants: data.id, message: data.message })) {

                const user: IUserModel = this.findClient(socket.id).user;
                const participants = data.id.concat(user.id);
                this.createConversation(participants).then((value: IConversationModel) => {
                    data.message['conversation'] = value.id;
                    data.message['author'] = user.id;
                    const message = new Message(data.message);
                    message.save((err: mongoose.Error, newMessage) => {
                        if (err) {
                            this.logger.error(err.message);
                        } else {
                            participants.forEach(participant => {
                                const client = this.findClient(null, participant);
                                if (client) {
                                    client.socket.join(newMessage.conversation);
                                }
                            });
                            this.server.in(newMessage.conversation).emit('newMessage', message);
                        }
                    });
                }).catch((err: Error) => { this.logger.error(err.message); });
            } else { this.logger.error('Invalid arguments'); }
        });
    }

    // NOT WORKING
    private onMessage = (socket: io.Socket) => {
        socket.on('message', (data: IMessage) => {
            console.log(data);
            this.logger.info(`User ${this.findClient(socket.id).user.username} has a new message`);
        });
    }

    private onSendMessage = (socket: io.Socket) => {
        socket.on('sendMessage', (data: IMessage) => {
            if (validateMessage(data)) {
                const user: IUserModel = this.findClient(socket.id).user;
                data['author'] = user.id;
                const message = new Message(data);
                message.save((err: mongoose.Error, newMessage) => {
                    if (err) {
                        this.logger.error(err.message);
                    } else {
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
                                    this.logger.socket(`User ${user[0].username} with id ${user[0].id} connected`);
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

    private onDisconect = (socket?: io.Socket) => {
        const sock = this.findClient(socket.id);
        if (sock) {
            const user = sock.user;
            socket.on('disconnect', () => {
                this.logger.socket(`User ${user.username} with id ${user.id} disconected`);
            });
        } else {
            socket.on('disconnect', () => {
                this.logger.socket(`Unsuccesfull connexion disconected`);
            });
        }
    }

    private findClient = (socketId?: string, participant?: string) => {
        if (socketId) {
            return this.clientList.find((value) => value.socket.id === socketId);
        } else {
            return this.clientList.find((value) => {
                return value.user.id === participant;
            });
        }
    }

    // EMITERS

    private createConversation = (participants: string[]): Promise<IConversationModel> => {
        return new Promise((resolve, reject) => {
            this.find(null, null, `participants-${participants.join()}`)
                .then(value => {
                    if (value.length) { resolve(value[0]); } else {
                        const conversation = new Conversation({ participants });
                        conversation.save((err, newConversation) => {
                            if (err) { reject(err); } else { resolve(newConversation); }
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
