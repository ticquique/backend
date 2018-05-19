import { EventSubscriber, On } from 'event-dispatch';
import { Logger } from '../../lib/logger';
import { events } from './events';
import { IActionModel } from '../../interfaces/database';
import { Action } from '../../database/models/feed/action';
import { MetaEvents } from '../../interfaces';
import { ActionService } from '../services/feed/ActionService';

const log = new Logger(__filename);

@EventSubscriber()
export class PostEventSubscriber {

    private actionService = ActionService.getInstance();

    @On(events.post.created)
    public onPostCreated(data: MetaEvents): void {
        const action: IActionModel = new Action({
            user: data.metadata.user, type: 'Reaction', object: data.data._id, relevancy: 0, IsHidden: data.metadata.hidden,
        });
        this.actionService.create(action).then(value => {
            log.info('Post ' + data.data.id + ' created!');
        }).catch(err => log.error('Post ' + data.data.id + ' created! but Action not added'));
    }

}
