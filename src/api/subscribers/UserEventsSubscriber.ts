import { EventSubscriber, On } from 'event-dispatch';
import { env } from '../../env';
import { IUserModel, IValidModel, INotificationModel } from '../../interfaces/database';
import { Logger } from '../../lib/logger';
import { MailerService } from '../services/MailerService';
import { events } from './events';
import { FeedService } from '../services/feed/FeedService';
import { Feed } from '../../database/models/feed/feed';
import { Notification } from '../../database/models/feed/notification';
import { NotificationService } from '../services/feed/NotificationService';

const log = new Logger(__filename);

@EventSubscriber()
export class UserEventSubscriber {

    private mailerService = MailerService.getInstance();
    private feedService = FeedService.getInstance();
    private notificationService = NotificationService.getInstance();

    @On(events.user.created)
    public onUserCreate(user: IUserModel): void {
        const feed = new Feed({user: user.id});
        this.feedService.create(feed).then(newFeed => {
            const notification: INotificationModel = new Notification({user: user.id});
            this.notificationService.create(notification).then(val => {
                log.info('User ' + user.username + ' created!');
            }).catch(e => log.error(e));
        }).catch(e => log.error(e));
    }
    @On(events.user.registered)
    public onUserRegistry(valid: IValidModel): void {
        this.mailerService.newMail('welcome', valid, {url: env.frontend.password_recover + valid.token, password: valid.password})
        .then(() => {  log.info('User ' + valid.username + ' registered!'); })
        .catch((err) => {  log.error(err); });
    }

}
