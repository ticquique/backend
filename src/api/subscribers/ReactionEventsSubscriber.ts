import { EventSubscriber, On } from 'event-dispatch';
import { Logger } from '../../lib/logger';
import { events } from './events';
import { IActionModel } from '../../interfaces/database';
import { Action } from '../../database/models/feed/action';
import { MetaEvents } from '../../interfaces';
import { ActionService } from '../services/feed/ActionService';
import { NotificationService } from '../services/feed/NotificationService';
import { ChatService } from '../services/ChatService';

const log = new Logger(__filename);

@EventSubscriber()
export class ReactionEventSubscriber {

    private actionService = ActionService.getInstance();
    private notificationService = NotificationService.getInstance();
    private chatService = ChatService.getInstance();

    @On(events.reaction.created)
    public onReaction(data: MetaEvents): void {
        const action: IActionModel = new Action({
            user: data.metadata.user, type: 'Reaction', object: data.data._id, relevancy: 0, IsHidden: data.metadata.hidden, reference: data.metadata.type,
        });
        this.actionService.create(action).then(value => {
            data.data.populate('related', (err, reactionWithPost) => {
                if (reactionWithPost.reference === 'Post') {
                    this.notificationService.update([action], reactionWithPost.related.author).then(val => {
                        this.chatService.emitNotification(value, reactionWithPost.related.author);
                    }).catch(e => log.error(e));
                } else {
                    log.error('Related not found');
                }
            });
            log.info('Reaction ' + data.data.id + ' created!');
        }).catch(err => log.error('Reaction ' + data.data.id + ' created! but Action not added'));
    }

    @On(events.reaction.deleted)
    public onDeleted(data: MetaEvents): void {
        log.info('Reaction ' + data.data.id + ' deleted!');
    }

}
