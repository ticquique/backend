import { EventSubscriber, On } from 'event-dispatch';
import { Logger } from '../../lib/logger';
import { events } from './events';
import { IPostModel, IActionModel } from '../../interfaces/database';
import { Action } from '../../database/models/feed/action';
import { FeedService } from '../services/FeedService';
import { MetaEvents } from '../../interfaces';

const log = new Logger(__filename);

@EventSubscriber()
export class PostEventSubscriber {

    private feedService = FeedService.getInstance();

    @On(events.post.created)
    public onPostCreated(data: MetaEvents): void {
        const action: IActionModel = new Action({
            user: data.metadata.user, type: 'reaction', object: data.data._id, relevancy: 0, IsHidden: data.metadata.hidden,
        });
        this.feedService.createAction(action).then(value => {
            log.info('Post ' + data.data.id + ' created!');
        }).catch(err => log.error('Post ' + data.data.id + ' created! but Action not added'));
    }

}
