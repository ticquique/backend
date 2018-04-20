import { INotificationModel } from '../../interfaces/database';
import * as mongoose from 'mongoose';

export class NotificationService {

    private static instance: NotificationService;
    private constructor() { }

    // tslint:disable-next-line:member-ordering
    public static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }
}
