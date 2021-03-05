import { SimpleGraphQLClient } from '@vendure/testing';
import {
  ADD_PAYMENT,
  GET_ELIGIBLE_SHIPPING_METHODS,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_METHOD,
  TRANSITION_TO_STATE,
} from './shared-queries';
import { Order, PaymentMethodHandler, LanguageCode } from '@vendure/core';

export const alwaysSettleHandler = new PaymentMethodHandler({
  code: 'always-settle',
  description: [
    { languageCode: LanguageCode.en, value: 'Test Payment Method' },
  ],
  args: {},
  createPayment: (ctx, order, amount, args, metadata) => {
    return {
      amount,
      state: 'Settled',
      transactionId: '12345',
      metadata: {
        moreData: 42,
      },
    };
  },
  settlePayment: () => {
    return {
      success: true,
      metadata: {
        moreData: 42,
      },
    };
  },
});

export async function proceedToArrangingPayment(
  shopClient: SimpleGraphQLClient
): Promise<Order> {
  await shopClient.query(SET_SHIPPING_ADDRESS, {
    input: {
      fullName: 'name',
      streetLine1: '12 the street',
      city: 'foo',
      postalCode: '123456',
      countryCode: 'US',
    },
  });
  const { eligibleShippingMethods } = await shopClient.query(
    GET_ELIGIBLE_SHIPPING_METHODS
  );
  await shopClient.query(SET_SHIPPING_METHOD, {
    id: eligibleShippingMethods[1].id,
  });
  const { transitionOrderToState } = await shopClient.query(
    TRANSITION_TO_STATE,
    { state: 'ArrangingPayment' }
  );
  return transitionOrderToState;
}

export async function addPaymentToOrder(
  shopClient: SimpleGraphQLClient,
  handler: PaymentMethodHandler
): Promise<Order> {
  const result = await shopClient.query(ADD_PAYMENT, {
    input: {
      method: handler.code,
      metadata: {
        baz: 'quux',
      },
    },
  });
  const order = result.addPaymentToOrder!;
  return order as any;
}

export async function settlePayment(
  shopClient: SimpleGraphQLClient
): Promise<Order> {
  return addPaymentToOrder(shopClient, alwaysSettleHandler);
}
