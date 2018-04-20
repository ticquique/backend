import * as express from 'express';
import { ChatController } from '../../controllers/chatController';
import { authMiddleware } from '../../middlewares/authMiddleware';
// tslint:disable-next-line:max-line-length
import { createConversationMiddleware, deleteConversationMiddleware, deleteMessageMiddleware, listConversationsMiddleware, listMessagesMiddleware } from '../../validators';

const chatController = ChatController.getInstance();

module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .get(authMiddleware('basic'), listConversationsMiddleware, chatController.find)
            .post(authMiddleware('basic'), createConversationMiddleware, chatController.create)
            .delete(authMiddleware('admin'), deleteConversationMiddleware, chatController.delete);
        router.route('/message')
            .get(authMiddleware('basic'), listMessagesMiddleware, chatController.findMessages)
            .delete(authMiddleware('admin'), deleteMessageMiddleware, chatController.deleteMessage);

        if (router) { resolve(router); } else { reject(''); }
    });
};
