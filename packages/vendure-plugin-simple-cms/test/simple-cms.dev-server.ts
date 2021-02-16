import {simpleCmsDevConfig} from './simple-cms.dev-config';
import {createTestEnvironment, registerInitializer, SqljsInitializer} from '@vendure/testing';
import {DefaultSearchPlugin} from '@vendure/core';
import {initialData} from '../../test/initialData';
import {AdminUiPlugin} from '@vendure/admin-ui-plugin';
import {compileUiExtensions} from '@vendure/ui-devkit/compiler';
import * as path from 'path';
import {simpleCmsAdminUi} from '../src/ui';

require('dotenv').config();

(async () => {
    registerInitializer('sqljs', new SqljsInitializer('__data__'));
    simpleCmsDevConfig.plugins.push(DefaultSearchPlugin);
    simpleCmsDevConfig.plugins.push(AdminUiPlugin.init({
        port: 3002,
        app: compileUiExtensions({
            outputPath: path.join(__dirname, '__admin-ui'),
            extensions: [simpleCmsAdminUi],
            devMode: true
        }),
    }));
    const {server} = createTestEnvironment(simpleCmsDevConfig);
    await server.init({
        initialData,
        productsCsvPath: '../test/products-import.csv',
    });
})();

