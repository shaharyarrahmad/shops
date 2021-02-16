import {DefaultLogger, LogLevel, mergeConfig} from '@vendure/core';
import {testConfig} from '@vendure/testing';
import {alwaysSettleHandler} from '../../test/test-vendure-utils';
import {SimpleCMSPlugin} from '../src';

require('dotenv').config();
export const simpleCmsDevConfig = mergeConfig(testConfig, {
    logger: new DefaultLogger({level: LogLevel.Debug}),
    paymentOptions: {
        paymentMethodHandlers: [alwaysSettleHandler]
    },
    plugins: [
        SimpleCMSPlugin
    ],
    customFields: {
        Product: [
            {name: 'weight', type: 'int', defaultValue: 300},
        ],
    }
});