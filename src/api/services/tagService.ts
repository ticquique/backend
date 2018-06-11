
import * as mongoose from 'mongoose';
import { ITagModel } from '../../interfaces/database/tag';
import { Tag } from '../../database/models/tag';

interface FindAction {
    [value: string]: any;
}

export class TagService {

    private static instance: TagService;

    private constructor() { }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): TagService {
        if (!TagService.instance) {
            TagService.instance = new TagService();
        }
        return TagService.instance;
    }

    // tslint:disable-next-line:max-line-length
    public find = (page: number = 1, perPage: number = 20, resource?: string | FindAction, sort?: string, filter?: string, partial?: boolean, populate?: any[] | any): Promise<ITagModel[]> => {
        return new Promise<ITagModel[]>((resolve, reject) => {
            let query: mongoose.Query<ITagModel[]> = null;
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
                query = Tag.find(resourcesQuery);
            } else if (resource && typeof resource !== 'string') {
                query = Tag.find(resource);
            } else {
                query = Tag.find({});
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
            query.exec((err: Error, actions) => {
                if (err) {reject(err); } else { resolve(actions); }
            });
        });
    }

    public create = (title: string): Promise<ITagModel> => {
        return new Promise<ITagModel>((resolve, reject) => {
            const tag = new Tag({title});
            tag.save((err, newTag) => {
                if (err) { reject(err); }
                resolve(newTag);
            });
        });
    }

}
