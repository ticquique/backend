export interface IEmail {
    to: {
        email: string;
        name: string;
    };
    from: {
        email: string;
        name: string;
    };
    subject?: string;
    templateId?: string;
    substitutions: {
        toName: string;
        fromName: string;
        url?: string;
        password?: string;
    };
}
