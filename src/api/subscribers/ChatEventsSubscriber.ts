import { EventSubscriber, On } from 'event-dispatch';
import { IConversationModel } from '../../interfaces/database';
import { Logger } from '../../lib/logger';
import { events } from './events';

const log = new Logger(__filename);

@EventSubscriber()
export class ChatEventSubscriber {

    @On(events.chat.created)
    public onChatCreated(chat: IConversationModel): void {
        log.info('Chat ' + chat.id + ' created!');
    }

}
