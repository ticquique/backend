import * as sendgrid from '@sendgrid/mail';
import { env } from '../../env';
import { IUserModel, IValidModel } from '../../interfaces/database';
import { IEmail } from '../../interfaces/email';

export class MailerService {

    private static instance: MailerService;
    public type = {
        lostPassword: '2f326e71-0d2b-4eb1-afed-be66f61ac5f0',
        welcome: 'dcf1060c-6a20-4b29-8aa4-90d24ad84da9',
    };
    private sendgrid = sendgrid;

    private constructor() {
        this.sendgrid.setApiKey(env.sendgrid.apikey);
        this.sendgrid.setSubstitutionWrappers('-', '-');
    }

    // tslint:disable-next-line:member-ordering
    public static getInstance(): MailerService {
        if (!MailerService.instance) {
            MailerService.instance = new MailerService();
        }
        return MailerService.instance;
    }

    public newMail = (type: 'welcome' | 'lostPassword', to: IUserModel | IValidModel, data?: {
        url?: string,
        password?: string
    }) => {
        const message: IEmail = {
            from: {
                email: env.sendgrid.accounts,
                name: env.app.name,
            },
            to: {
                email: to.email,
                name: to.username,
            },
            substitutions: {
                fromName: env.app.name,
                toName: to.username,
            },
        };
        if (type === 'lostPassword') {
            message.templateId = this.type.lostPassword;
            message.substitutions.url = data.url;
        }
        if (type === 'welcome') {
            message.templateId = this.type.welcome;
            message.substitutions.url = data.url;
            message.substitutions.password = data.password;
        }
        return this.sendMail(message);
    }

    public sendMail = (message: IEmail) => {
        return new Promise((resolve, reject) => {
            this.sendgrid.send(message)
            .then(() => {resolve(); })
            .catch((error) => {reject(error); });
        });
    }
}
