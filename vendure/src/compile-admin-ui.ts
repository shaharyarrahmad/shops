import {compileUiExtensions} from '@vendure/ui-devkit/compiler';
import * as path from 'path';
import {WebhookPlugin} from 'vendure-plugin-webhook';

compileUiExtensions({
    outputPath: path.join(__dirname, '__admin-ui'),
    extensions: [WebhookPlugin.ui],
})
    .compile?.()
    .then(() => {
        process.exit(0);
    });
