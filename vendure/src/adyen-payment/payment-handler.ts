import {PaymentMethodHandler} from '@vendure/core';
import { LanguageCode } from '@vendure/common/lib/generated-types';

const myPaymentIntegration = new PaymentMethodHandler({
    code: 'adyen-payment',
    description: [{ languageCode: LanguageCode.en, value: 'Adyen payment' }],
    args: {
        apiKey: { type: 'string' },
    },

    /** This is called when the `addPaymentToOrder` mutation is executed */
    createPayment: async (order, args, metadata): Promise<CreatePaymentResult> => {
        try {
            const result = await sdk.charges.create({
                apiKey: args.apiKey,
                amount: order.total,
                source: metadata.token,
            });
            return {
                amount: order.total,
                state: 'Authorized' as const,
                transactionId: result.id.toString(),
                metadata: result.outcome,
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
            const result = await sdk.charges.capture({
                apiKey: args.apiKey,
                id: payment.transactionId,
            });
            return { success: true };
        } catch (err) {
            return {
                success: false,
                errorMessage: err.message,
            }
        }
    },
});
