import {GoogleStorageStrategy} from 'vendure-plugin-google-storage-assets';
import * as tmp from 'tmp';

const bucket = 'pinelab-shops-test-assets';
(async () => {

    const strat = new GoogleStorageStrategy({
        bucketName: bucket
    });

    let [files] = await strat.storage.bucket(bucket).getFiles();

    files = files.filter(f => f.name.startsWith('preview/') && !f.name.endsWith('_thumbnail.jpg'))

    for (const file of files) {
        const tmpFile = tmp.fileSync();
        await strat.storage.bucket(bucket).file(file.name).download({destination: tmpFile.name});
        await strat.writeThumbnail(file.name, tmpFile.name);
        console.log(`Thumbnailified ${file.name}`);
    }

    console.log(`Total files ${files.length}`);

})()