import { IAttachmentModel } from '../../interfaces/database';

import * as mongoose from 'mongoose';
import { Attachment } from '../../database/models/attachment';

interface FindAction {
    [value: string]: any;
}

export class AttachmentService {

    private static instance: AttachmentService;
    private constructor() { }

    // tslint:disable-next-line:member-ordering
    public static getInstance(): AttachmentService {
        if (!AttachmentService.instance) {
            AttachmentService.instance = new AttachmentService();
        }
        return AttachmentService.instance;
    }

    // tslint:disable-next-line:max-line-length
    public find = (page: number = 1, perPage: number = 20, resource?: string | FindAction, sort?: string, filter?: string, partial?: boolean, populate?: any[] | any): Promise<IAttachmentModel[]> => {
        return new Promise<IAttachmentModel[]>((resolve, reject) => {
            let query: mongoose.Query<IAttachmentModel[]> = null;
            if (resource && typeof resource === 'string') {
                const resources = resource.split(';');
                const resourcesQuery: any = {};
                resources.forEach((value) => {
                    const elem = value.split('-');
                    if (elem.length === 2) {
                        if (partial) { resourcesQuery[elem[0]] = new RegExp('^' + elem[1]); } else { resourcesQuery[elem[0]] = elem[1]; }
                    } else {
                        reject(new Error('Invalid resource query'));
                    }
                });
                query = Attachment.find(resourcesQuery);
            } else if (resource && typeof resource !== 'string') {
                query = Attachment.find(resource);
            } else {
                query = Attachment.find({});
            }
            if (perPage) {
                query.limit(perPage);
            }
            if (page && perPage) {
                query.skip((page - 1) * perPage);
            }
            if (filter) {
                const filters = filter.split(',');
                let arrayFilter = '';
                filters.forEach((filt) => {
                    if (filt.startsWith('-')) {
                        filt = filt.substr(1);
                        arrayFilter = arrayFilter + ` -${filt}`;
                    } else {
                        arrayFilter = arrayFilter + ` ${filt}`;
                    }
                });
                query.select(arrayFilter);
            }
            if (sort) {
                const array = sort.split(',');
                const arraySort = [];
                array.forEach(order => {
                    if (order.startsWith('-')) {
                        order = order.substr(1);
                        arraySort.push([order, -1]);
                    } else {
                        arraySort.push([order, 1]);
                    }
                });
                query.sort(arraySort);
            }
            if (populate) {
                if (populate instanceof Array) {
                    populate.forEach(populatedField => {
                        query.populate(populatedField);
                    });
                } else {
                    query.populate(populate);
                }
            }
            query.exec((err: Error, conversations) => {
                if (err) { reject(err); } else { resolve(conversations); }
            });
        });
    }

    public create = (attachment: IAttachmentModel, userId?: string, populate?: string): Promise<IAttachmentModel> => {
        return new Promise<IAttachmentModel>((resolve, reject) => {
            if (userId) { attachment.userId = userId; }
            attachment.save((err, newAttachment) => {
                if (err) { reject(err); }
                if (populate) {
                    newAttachment.populate(populate, (e, populated) => {
                        if (e) {reject(e); } else { resolve(populated); }
                    });
                } else {
                    resolve(newAttachment);
                }
            });
        });
    }

    public delete = (id: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            Attachment.remove({ _id: id }, (err) => {
                if (err) { reject(err); } else {
                    resolve('Correctly deleted conversation');
                }
            });
        });
    }
}
