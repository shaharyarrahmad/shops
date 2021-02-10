require('dotenv').config();
import {createTestEnvironment, registerInitializer, SqljsInitializer} from '@vendure/testing';
import {DefaultSearchPlugin, mergeConfig} from '@vendure/core';
import {initialData} from '../../test/initialData';
import {AdminUiPlugin} from '@vendure/admin-ui-plugin';
import {devConfig} from './dev-config';

(async () => {
    registerInitializer('sqljs', new SqljsInitializer('__data__'));
    const config = mergeConfig(devConfig, {
        plugins: [
            DefaultSearchPlugin,
            AdminUiPlugin.init({
                port: 3002,
            }),
        ]
    });
    const {server} = createTestEnvironment(config);
    await server.init({
        initialData,
        productsCsvPath: '../test/products-import.csv',
    });
})();

