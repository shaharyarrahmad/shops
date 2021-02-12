import {IncomingWebhookBody} from '../src/types/sendcloud-api-response.types';
import {sendcloudDevConfig} from './sendcloud.dev-config';
import {proceedToArrangingPayment, settlePayment} from '../../test/test-vendure-utils';
import {doPost} from '../../test/test-utils';
import {initialData} from '../../test/initialData';
import {createTestEnvironment, registerInitializer, SqljsInitializer, testConfig} from '@vendure/testing';
import {DeepPartial, DefaultLogger, LogLevel, Order} from '@vendure/core';
import {ADD_ITEM_TO_ORDER, GET_CUSTOMER_LIST, GET_ORDER} from '../../test/shared-queries';
import crypto from "crypto";

require('dotenv').config();

describe('ChannelAware Assets', () => {

    testConfig.logger = new DefaultLogger({level: LogLevel.Debug});
    registerInitializer('sqljs', new SqljsInitializer('__data__'));
    const {server, adminClient, shopClient} = createTestEnvironment(sendcloudDevConfig);
    let order: Order;

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
        order = await proceedToArrangingPayment(shopClient);
        expect(order.state).toEqual('ArrangingPayment');
    });

    it('Settle payment', async () => {
        order = await settlePayment(shopClient);
        expect(order.state).toEqual('PaymentSettled');
    });

    it('Mock webhook "Driver en route (91)" > order shipped', async () => {
        const body = getWebhookBody(order.code, 91);
        const res = await doPost('sendcloud/webhook', body, getWebhookHeader(JSON.stringify(body)));
        expect(res.ok).toEqual(true);
        const {order: updateOrder} = await adminClient.query(GET_ORDER, {
            id: order.id,
        });
        expect(updateOrder.state).toBe('Shipped');
    });

    it('Mock webhook "Delivered (11)" > order delivered', async () => {
        const body = getWebhookBody(order.code, 11);
        const res = await doPost('sendcloud/webhook', body, getWebhookHeader(JSON.stringify(body)));
        expect(res.ok).toEqual(true);
        const {order: updateOrder} = await adminClient.query(GET_ORDER, {
            id: order.id,
        });
        expect(updateOrder.state).toBe('Delivered');
    });

    it('Mock webhook "Cancelled (2000)" > order cancelled', async () => {
        const body = getWebhookBody(order.code, 2000);
        const res = await doPost('sendcloud/webhook', body, getWebhookHeader(JSON.stringify(body)));
        expect(res.ok).toEqual(true);
        const {order: updateOrder} = await adminClient.query(GET_ORDER, {
            id: order.id,
        });
        expect(updateOrder.state).toBe('Cancelled');
    });

});

export function getWebhookBody(orderCode: string, statusCode: number): DeepPartial<IncomingWebhookBody> {
    return {
        action: 'parcel_status_changed',
        parcel: {
            order_number: orderCode,
            status: {
                id: statusCode
            }
        },
    };
}

export function getWebhookHeader(body: string): { 'sendcloud-signature': string } {
    const hash = crypto.createHmac("sha256", process.env.SENDCLOUD_API_SECRET as string).update(body).digest("hex");
    return {'sendcloud-signature': hash};
}
