import {CreatePaymentResult, PaymentMethodHandler, SettlePaymentResult} from '@vendure/core';
import {LanguageCode} from '@vendure/common/lib/generated-types';
import {MollieChannel} from './mollie-channel';

export const molliePaymentHandler = new PaymentMethodHandler({
    code: 'mollie-payment-handler',
    description: [{
        languageCode: LanguageCode.en,
        value: 'Mollie payment',
    }],
    args: {
        channelKeys: {
            type: 'string', list: true, description: [{
                languageCode: LanguageCode.en,
                value: 'Use this format: CHANNELTOKEN=MOLLIEKEY,REDIRECT_URL',
            }]
        }
    },

    /** This is called when the `addPaymentToOrder` mutation is executed */
    createPayment: async (order, args, metadata): Promise<CreatePaymentResult> => {
        try {
            const mollieClient = MollieChannel.getClient(args.channelKeys, metadata.channel);
            const payment = await mollieClient.payments.create({
                amount: {
                    value: `${(order.total / 100).toFixed(2)}`,
                    currency: 'EUR',
                },
                metadata: {
                    orderCode: order.code
                },
                description: `Bestelling ${order.code}`,
                redirectUrl: `${process.env.STOREFRONT_HOST}/order/${order.code}`,
                webhookUrl: `${process.env.VENDURE_HOST}/payments/mollie/${metadata.channel}`
            });
            return {
                amount: order.total,
                transactionId: payment.id,
                state: 'Authorized' as const,
                metadata: {
                    public: {
                        redirectLink: payment.getPaymentUrl(),
                    }
                },
            };
        } catch (err) {
            return {
                amount: order.total,
                state: 'Declined' as const,
                metadata: {
                    errorMessage: err.message,
                },
            };
        }
    },

    /** This is called when the `settlePayment` mutation is executed */
    settlePayment: async (order, payment, args): Promise<SettlePaymentResult> => {
        try {
            // do something
            return {success: true};
        } catch (err) {
            return {
                success: false,
                errorMessage: err.message,
            }
        }
    },
});
