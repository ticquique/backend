export interface MetaEvents {
    data: any;
    metadata: {
        hidden: boolean,
        user: string,
        relevancy?: number,
        type?: any,
    };
}
