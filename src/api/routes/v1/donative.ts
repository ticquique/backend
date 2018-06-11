import * as express from 'express';
import { DonativeController } from '../../controllers/donativeController';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { createCustomerMiddleware, createChargeMiddleware } from '../../validators/joi/donative';

const donativeController = DonativeController.getInstance();

module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        const router = express.Router();
        router.route('/')
            .post(authMiddleware('basic'), createCustomerMiddleware, donativeController.createCustomer);

        router.route('/charge')
            .post(authMiddleware('min'), createChargeMiddleware, donativeController.createCharge);

        if (router) { resolve(router); } else { reject(''); }
    });
};
