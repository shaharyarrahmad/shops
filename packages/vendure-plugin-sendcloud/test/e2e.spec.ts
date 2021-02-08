/* tslint:disable:no-non-null-assertion */
import gql from 'graphql-tag';
import {initialData} from '../../test/initialData';
import {createTestEnvironment, registerInitializer, SqljsInitializer, testConfig} from '@vendure/testing';
import {DefaultLogger, LogLevel} from '@vendure/core';
import {SendcloudPlugin} from '../src';

describe('ChannelAware Assets', () => {

    testConfig.logger = new DefaultLogger({level: LogLevel.Debug});
    registerInitializer('sqljs', new SqljsInitializer('__data__'));
    testConfig.plugins.push(SendcloudPlugin);
    const {server, adminClient, shopClient} = createTestEnvironment(testConfig);

    beforeAll(async () => {
        await server.init({
            initialData,
            productsCsvPath: '../test/products-import.csv',
        });
    }, 1800 * 1000);

    afterAll(async () => {
        await server.destroy();
    });

    it('Test', async () => {
        const ding = await shopClient.query(gql`{ products { items { id } }}`);
        console.log(ding);
        expect(ding).toBeDefined();
    });

});
