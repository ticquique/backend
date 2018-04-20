import { EventSubscriber, On } from 'event-dispatch';
import { ISubscriptionModel, IUserModel } from '../../interfaces/database';
import { Logger } from '../../lib/logger';
import { events } from './events';
import { MetaEvents } from '../../interfaces';

const log = new Logger(__filename);

@EventSubscriber()
export class SubscriptionEventSubscriber {

    @On(events.subscription.subscribed)
    public onSubscription(data: MetaEvents): void {
        log.info('Subscription ' + data.data.id + ' created!');
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
