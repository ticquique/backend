import * as AWS from 'aws-sdk';
import { env } from '../../env';
import * as sharp from 'sharp';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { Buffer } from 'buffer';
import { FileUploaded, Urls, FileData } from '../../interfaces';

interface PromiseSizes {
    buffer: Buffer;
    info: {
        name: string,
        prefix: string,
        size: number,
        height: number,
        width: number,
    };
}

export class UploadService {

    private static instance: UploadService;
    private s3: AWS.S3;
    private sizes = [{ name: 'big', prefix: 'big-', size: 1080 },
    { name: 'medium', prefix: 'medium-', size: 720 },
    { name: 'small', prefix: 'small-', size: 480 },
    { name: 'low', prefix: 'low-', size: 200 }];

    private constructor() {
        this.initialize();
    }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): UploadService {
        if (!UploadService.instance) {
            UploadService.instance = new UploadService();
        }
        return UploadService.instance;
    }

    public uploadFile = (file: NodeJS.ReadableStream, params: FileData, userId: string): Promise<FileUploaded> => {
        let uploaded: Buffer = new Buffer('');
        const colors = ['rgba(141, 211, 199, 1)', 'rgba(255, 255, 179, 1)', 'rgba(190, 186, 218, 1)',
            'rgba(251, 128, 114, 1)', 'rgba(128, 177, 211, 1)', 'rgba(253, 180, 98, 1)',
            'rgba(179, 222, 105, 1)', 'rgba(252, 205, 229, 1)', 'rgba(217, 217, 217, 1)',
            'rgba(188, 128, 189, 1)', 'rgba(204, 235, 197, 1)', 'rgba(255, 237, 111, 1)'];
        const urls: Urls = { small: '', medium: '', big: '', low: '', orig: '' };
        const randc = (array) => array[Math.random() * array.length | 0]; // tslint:disable-line:no-bitwise
        const uploadParams: PutObjectRequest = {
            Bucket: env.upload.bucket,
            Key: `${userId}/${'orig-' + Date.now()}`,
            Body: '',
            ACL: 'public-read',
            CacheControl: 'max-age=31536000',
            ContentType: params.mimetype,
            Metadata: { imgsize: 'orig' },
        };

        return new Promise<FileUploaded>((resolve, reject) => {
            file.on('data', (data) => {
                uploaded = Buffer.concat([uploaded, data]);
            });
            file.on('end', () => {
                const promiseS3: Array<Promise<AWS.S3.ManagedUpload.SendData>> = [];
                uploadParams.Body = uploaded;
                promiseS3.push(this.s3.upload(uploadParams).promise());
                const promises = this.sizes.map((value) => {
                    return new Promise<PromiseSizes>((res, rej) => {
                        if (value.name === 'low') {
                            sharp(uploaded).withoutEnlargement().resize(value.size)
                                .background(randc(colors)).embed()
                                .blur(1000).toBuffer(
                                    (e, buffer, info) => {
                                        if (e) { rej(e); }
                                        res({
                                            buffer,
                                            info: { name: value.name, prefix: value.prefix, size: info.size, height: info.height, width: info.width },
                                        });
                                    });
                        }
                        sharp(uploaded).resize(value.size).withoutEnlargement().max().toBuffer((e, buffer, info) => {
                            if (e) { rej(e); }
                            res({
                                buffer,
                                info: { name: value.name, prefix: value.prefix, size: info.size, height: info.height, width: info.width },
                            });
                        });
                    });
                });
                Promise.all(promises).then((values) => {
                    values.forEach(value => {
                        uploadParams.Key = `${userId}/${value.info.prefix + Date.now()}`;
                        uploadParams.Body = value.buffer;
                        promiseS3.push(this.s3.upload(uploadParams).promise());
                    });
                    Promise.all(promiseS3).then((s3Uploads) => {
                        s3Uploads.forEach(s3Upload => {
                            const dir = s3Upload.Location;
                            const type = dir.slice(dir.lastIndexOf('/') + 1, dir.indexOf('-', dir.lastIndexOf('/')));
                            urls[type] = dir;
                        });
                        const result: FileUploaded = { urls, params };
                        resolve(result);
                    }).catch(e => reject(e));
                }).catch(e => {
                    reject(e);
                });
            });
        });
    }

    private initialize = () => {
        this.s3 = new AWS.S3({
            apiVersion: env.upload.apiVersion,
            accessKeyId: env.upload.accessKey,
            secretAccessKey: env.upload.secretKey,
            region: env.upload.region,
        });
    }

}
