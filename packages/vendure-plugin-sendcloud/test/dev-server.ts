import {createTestEnvironment, registerInitializer, SqljsInitializer, testConfig} from '@vendure/testing';
import {DefaultLogger, LogLevel, mergeConfig} from '@vendure/core';
import {SendcloudPlugin} from '../src';
import {initialData} from '../../test/initialData';
import {AdminUiPlugin} from '@vendure/admin-ui-plugin';

/*
testConfig.logger = new DefaultLogger({level: LogLevel.Debug});
testConfig.dbConnectionOptions.synchronize = true;

registerInitializer('sqljs', new SqljsInitializer('__data__'));
testConfig.plugins.push(SendcloudPlugin);

bootstrap(testConfig)
    .then(() => {
        console.log(`\x1b[46mDevserver started\x1b[0m`);
    })
    .catch(err => console.error(err));

*/

(async () => {

    registerInitializer('sqljs', new SqljsInitializer('__data__'));

    const devConfig = mergeConfig(testConfig, {
        logger: new DefaultLogger({level: LogLevel.Debug}),
        plugins: [
            AdminUiPlugin.init({
                port: 3002,
            }),
            SendcloudPlugin
        ]
    });

    const {server} = createTestEnvironment(devConfig);
    await server.init({
        initialData,
        productsCsvPath: '../test/products-import.csv',
    });
})();

