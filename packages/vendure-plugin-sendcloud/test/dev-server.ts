import {alwaysSettleHandler} from '../../test/test-order-utils';

require('dotenv').config();
import {createTestEnvironment, registerInitializer, SqljsInitializer, testConfig} from '@vendure/testing';
import {DefaultLogger, DefaultSearchPlugin, LogLevel, mergeConfig} from '@vendure/core';
import {SendcloudPlugin} from '../src';
import {initialData} from '../../test/initialData';
import {AdminUiPlugin} from '@vendure/admin-ui-plugin';

(async () => {
    registerInitializer('sqljs', new SqljsInitializer('__data__'));
    const devConfig = mergeConfig(testConfig, {
        logger: new DefaultLogger({level: LogLevel.Debug}),
        paymentOptions: {
            paymentMethodHandlers: [alwaysSettleHandler]
        },
        dbConnectionOptions: {
            synchronize: true
        },
        plugins: [
            DefaultSearchPlugin,
            AdminUiPlugin.init({
                port: 3002,
            }),
            SendcloudPlugin.init({
                publicKey: process.env.SENDCLOUD_API_PUBLIC!,
                secret: process.env.SENDCLOUD_API_SECRET!
            })
        ]
    });
    const {server} = createTestEnvironment(devConfig);
    await server.init({
        initialData,
        productsCsvPath: '../test/products-import.csv',
    });
})();

