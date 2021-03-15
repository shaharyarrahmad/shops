import {compileUiExtensions} from '@vendure/ui-devkit/compiler';
import * as path from 'path';

compileUiExtensions({
    outputPath: path.join(__dirname, '__admin-ui'),
    extensions: [],
    devMode: true
})
    .compile?.()
    .then(() => {
        process.exit(0);
    });
