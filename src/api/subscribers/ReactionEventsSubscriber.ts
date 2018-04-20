import { EventSubscriber, On } from 'event-dispatch';
import { Logger } from '../../lib/logger';
import { events } from './events';
import { IReactionModel, IActionModel } from '../../interfaces/database';
import { Action } from '../../database/models/feed/action';
import { FeedService } from '../services/FeedService';
import { MetaEvents } from '../../interfaces';

const log = new Logger(__filename);

@EventSubscriber()
export class ReactionEventSubscriber {

    private feedService: FeedService = FeedService.getInstance();

    @On(events.reaction.created)
    public onReaction(data: MetaEvents): void {
        const action: IActionModel = new Action({
            user: data.metadata.user, type: 'reaction', object: data.data._id, relevancy: 0, IsHidden: data.metadata.hidden,
        });
        this.feedService.createAction(action).then(value => {
            log.info('Reaction ' + data.data.id + ' created!');
        }).catch(err => log.error('Reaction ' + data.data.id + ' created! but Action not added'));
    }

}
