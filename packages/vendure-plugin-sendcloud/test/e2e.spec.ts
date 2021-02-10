require('dotenv').config();
import {proceedToArrangingPayment, settlePayment} from '../../test/test-order-utils';
import {initialData} from '../../test/initialData';
import {createTestEnvironment, registerInitializer, SqljsInitializer, testConfig} from '@vendure/testing';
import {DefaultLogger, LogLevel} from '@vendure/core';
import {ADD_ITEM_TO_ORDER, GET_CUSTOMER_LIST} from '../../test/shared-queries';
import {devConfig} from './dev-config';

describe('ChannelAware Assets', () => {

    testConfig.logger = new DefaultLogger({level: LogLevel.Debug});
    registerInitializer('sqljs', new SqljsInitializer('__data__'));
    const {server, adminClient, shopClient} = createTestEnvironment(devConfig);

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
        await shopClient.asUserWithCredentials(customers[1].emailAddress, 'test');
    }, 7000);

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
