import {
  CreatePaymentResult, Logger,
  PaymentMethodHandler,
  SettlePaymentResult,
} from '@vendure/core';
import { LanguageCode } from '@vendure/common/lib/generated-types';
import createMollieClient from '@mollie/api-client';
import {MolliePlugin} from './mollie.plugin';

export const molliePaymentHandler = new PaymentMethodHandler({
  code: 'mollie-payment-handler',
  description: [
    {
      languageCode: LanguageCode.en,
      value: 'Mollie payment',
    },
  ],
  args: {
    apiKey: {
      type: 'string',
    },
    redirectUrl: {
      type: 'string',
    },
  },

  /** This is called when the `addPaymentToOrder` mutation is executed */
  createPayment: async (
    ctx,
    order,
    amount,
    args,
    metadata
  ): Promise<CreatePaymentResult> => {
    try {
      let {apiKey, redirectUrl} = args;
      if (redirectUrl && !redirectUrl.endsWith('/')) {
        redirectUrl = `${redirectUrl}/`; // append slash if
      }
      const mollieClient = createMollieClient({ apiKey });
      const payment = await mollieClient.payments.create({
        amount: {
          value: `${(order.totalWithTax / 100).toFixed(2)}`,
          currency: 'EUR',
        },
        metadata: {
          orderCode: order.code,
        },
        description: `Bestelling ${order.code}`,
        redirectUrl: `${redirectUrl}order/${order.code}`,
        webhookUrl: `${process.env.VENDURE_HOST}/payments/mollie/${ctx.channel.token}`,
      });
      return {
        amount: order.totalWithTax,
        transactionId: payment.id,
        state: 'Authorized' as const,
        metadata: {
          public: {
            redirectLink: payment.getPaymentUrl(),
          },
        },
      };
    } catch (err) {
      Logger.error(err, MolliePlugin.context);
      return {
        amount: order.totalWithTax,
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
      return { success: true };
    } catch (err) {
      return {
        success: false,
        errorMessage: err.message,
      };
    }
  },
});
