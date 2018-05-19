import { listNotificationMiddleware } from './../../validators/joi/notification';
import * as express from 'express';
import { NotificationController } from '../../controllers/notificationController';
import { authMiddleware } from '../../middlewares/authMiddleware';

module.exports = async () => {
    const notificationController = NotificationController.getInstance();
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .get(authMiddleware('basic'), listNotificationMiddleware, notificationController.find);
        if (router) { resolve(router); } else { reject(''); }
    });
};
