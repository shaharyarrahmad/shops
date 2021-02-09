import {
    addPaymentToOrder,
    alwaysSettleHandler,
    proceedToArrangingPayment,
    settlePayment
} from '../../test/test-order-utils';

require('dotenv').config();
import gql from 'graphql-tag';
import {initialData} from '../../test/initialData';
import {createTestEnvironment, registerInitializer, SqljsInitializer, testConfig} from '@vendure/testing';
import {DefaultLogger, LogLevel} from '@vendure/core';
import {SendcloudPlugin} from '../src';
import {ADD_ITEM_TO_ORDER, GET_CUSTOMER_LIST} from '../../test/shared-queries';

describe('ChannelAware Assets', () => {

    testConfig.logger = new DefaultLogger({level: LogLevel.Debug});
    registerInitializer('sqljs', new SqljsInitializer('__data__'));
    testConfig.plugins.push(SendcloudPlugin.init({
        publicKey: process.env.SENDCLOUD_API_PUBLIC!,
        secret: process.env.SENDCLOUD_API_SECRET!
    }));
    testConfig.paymentOptions.paymentMethodHandlers.push(alwaysSettleHandler);
    const {server, adminClient, shopClient} = createTestEnvironment(testConfig);

    beforeAll(async () => {
        await server.init({
            initialData,
            productsCsvPath: '../test/products-import.csv',
            customerCount: 3
        });
        await adminClient.asSuperAdmin();
        const result = await adminClient.query(
            GET_CUSTOMER_LIST,
            {
                options: {
                    take: 3,
                },
            },
        );
        const customers = result.customers.items;
        await shopClient.asUserWithCredentials(customers[0].emailAddress, 'test');
    }, 5000);

    afterAll(async () => {
        await server.destroy();
    });

    it('Add item to order', async () => {
        const {addItemToOrder} = await shopClient.query(ADD_ITEM_TO_ORDER, {
            productVariantId: 'T_1',
            quantity: 1,
        });
        expect(addItemToOrder.lines.length).toBe(1);
    });

    it('Transition to arrangingPayment', async () => {
        const order = await proceedToArrangingPayment(shopClient);
        expect(order.state).toEqual('ArrangingPayment');
    });

    it('Settle payment', async () => {
        const order = await settlePayment(shopClient);
        expect(order.state).toEqual('PaymentSettled');
    });

});
