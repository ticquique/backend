import * as express from 'express';
import { SubscriptionController } from '../../controllers/subscriptionController';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { createSubscriptionMiddleware, deleteSubscriptionMiddleware, listSubscriptionMiddleware } from '../../validators/joi/subscription';

const subscriptionController = SubscriptionController.getInstance();

module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .get(authMiddleware('basic'), listSubscriptionMiddleware, subscriptionController.find)
            .post(authMiddleware('basic'), createSubscriptionMiddleware, subscriptionController.create)
            .delete(authMiddleware('basic'), deleteSubscriptionMiddleware, subscriptionController.delete);

        if (router) { resolve(router); } else { reject(''); }
    });
};
