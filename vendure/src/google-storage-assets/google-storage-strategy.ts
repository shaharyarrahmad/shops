import {AssetStorageStrategy, Injector} from '@vendure/core';
import {Storage} from '@google-cloud/storage';
import {Readable, Stream} from 'stream';


export class GoogleStorageStrategy implements AssetStorageStrategy {

    bucketName = 'pinelab-shops-assets';
    storage: Storage;
    urlPrefix = 'https://storage.googleapis.com/';

    constructor() {
        this.storage = new Storage();
    }

    deleteFile(identifier: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    fileExists(fileName: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    readFileToBuffer(identifier: string): Promise<Buffer> {
        return Promise.resolve(undefined);
    }

    readFileToStream(identifier: string): Promise<Stream> {
        return Promise.resolve(undefined);
    }

    async writeFileFromBuffer(fileName: string, data: Buffer): Promise<string> {
        await this.storage.bucket(this.bucketName).upload(fileName, {})
    }

    writeFileFromStream(fileName: string, data: Stream): Promise<string> {
        return Promise.resolve('');
    }
}
