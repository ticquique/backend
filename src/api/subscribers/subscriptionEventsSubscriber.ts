import { ActionService } from './../services/feed/ActionService';
import { EventSubscriber, On } from 'event-dispatch';
import { IUserModel, IActionModel } from '../../interfaces/database';
import { Logger } from '../../lib/logger';
import { events } from './events';
import { MetaEvents } from '../../interfaces';
import { NotificationService } from '../services/feed/NotificationService';
import { Action } from '../../database/models/feed/action';
import { ChatService } from '../services/ChatService';

const log = new Logger(__filename);

@EventSubscriber()
export class SubscriptionEventSubscriber {

    private notificationService: NotificationService = NotificationService.getInstance();
    private chatService: ChatService = ChatService.getInstance();
    private actionService: ActionService = ActionService.getInstance();

    @On(events.subscription.subscribed)
    public onSubscription(data: MetaEvents): void {
        const action: IActionModel = new Action({
            user: data.metadata.user, type: 'Subscription', object: data.data._id, relevancy: 0, IsHidden: data.metadata.hidden, reference: data.metadata.type,
        });
        this.actionService.create(action).then(value => {
            this.notificationService.update([action], data.data.subscribable).then(val => {
                this.chatService.emitNotification(action, data.data.subscribable);
                log.info('Subscription ' + data.data.id + ' created!');
            }).catch(e => log.error(e));
        }).catch(err => log.error('Subscription ' + data.data.id + ' created! but Action not added' + err));
    }
    @On(events.subscription.unsubscribed)
    public onUnsubscription(data: MetaEvents): void {
        log.info('Subscription ' + data.data.id + ' deleted!');
    }
    @On(events.subscription.deleted)
    public onSubscriptionDeleted(user: IUserModel): void {
        log.info(`'User ${user.username} added to the blacklist`);
    }

}
