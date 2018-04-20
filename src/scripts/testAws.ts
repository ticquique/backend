
import * as S3 from 'aws-sdk/clients/s3';
import * as express from 'express';
import { Attachment } from '../database/models/attachment';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as fs from 'fs';
import * as path from 'path';
import { env } from '../env';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { IAttachmentModel, IUserModel } from '../interfaces/database';
// Create S3 service object

class AttachmentService {
    private static instance: AttachmentService;
    private uploadParams: PutObjectRequest;
    private s3: S3;
    private constructor() {
        const s3Config = {
            apiVersion: '2016-12-13',
            accessKeyId: env.upload.accessKey,
            secretAccessKey: env.upload.secretKey,
            region: env.upload.region,
        };
        this.s3 = new S3(s3Config);
        this.uploadParams = { Bucket: env.upload.bucket, Key: '', Body: '' };
    }
    // tslint:disable-next-line:member-ordering
    public static getInstance(): AttachmentService {
        if (!AttachmentService.instance) {
            AttachmentService.instance = new AttachmentService();
        }
        return AttachmentService.instance;
    }

    public create = (file: File, user: IUserModel): Promise<IAttachmentModel> => {
        return new Promise((resolve, reject) => {
            const albumKey = `${Date.now()}${file.name}`;
            const fileStream = fs.createReadStream(file);
            fileStream.on('error', (err) => {
                console.log('File error', err);
            });

            uploadParams.Body = fileStream;
            uploadParams.Key = path.basename(file);
            s3.upload(uploadParams, opts, (err, data) => {
                if (err) { console.log('Error', err); }
                if (data) { console.log('Upload Success', data.Location); }
            });

        });
    }

}

// const upload = multer({
//     storage: multerS3({
//         s3,
//         bucket: 'inarts',
//         cacheControl: 'max-age=31536000',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         metadata: (req, file, cb) => {
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: (req, file, cb) => {
//             cb(null, Date.now().toString());
//         },
//     }),
//     limits: {
//         files: 20,
//         fileSize: 1 * 1024 * 500,
//     },
// });

// upload.single('a')

// const uploadParams: PutObjectRequest = { Bucket: env.upload.bucket, Key: '', Body: '' };
// const file = process.argv[2];
// const fileStream = fs.createReadStream(file);
// fileStream.on('error', (err) => {
//     console.log('File error', err);
// });

// uploadParams.Body = fileStream;
// uploadParams.Key = path.basename(file);
// s3.upload(uploadParams, opts, (err, data) => {
//     if (err) { console.log('Error', err); }
//     if (data) { console.log('Upload Success', data.Location); }
// });

// const createAlbum = (albumName: string) => {
//     albumName = albumName.trim();
//     if (!albumName) {
//         return alert('Album names must contain at least one non-space character.');
//     }
//     if (albumName.indexOf('/') !== -1) {
//         return alert('Album names cannot contain slashes.');
//     }
//     const albumKey = encodeURIComponent(albumName) + '/';
//     s3.headObject({ Bucket: env.upload.bucket, Key: albumKey }, (err, data) => {
//         if (!err) {
//             return alert('Album already exists.');
//         }
//         if (err.code !== 'NotFound') {
//             return alert('There was an error creating your album: ' + err.message);
//         }
//         s3.putObject({ Bucket: env.upload.bucket, Key: albumKey }, (error, uploaded) => {
//             if (err) {
//                 return alert('There was an error creating your album: ' + err.message);
//             }
//             alert('Successfully created album.');
//         });
//     });

// };
