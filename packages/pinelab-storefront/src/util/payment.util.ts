import { VendureClient } from '../vendure/vendure.client';

export async function startPayment(
  vendure: VendureClient,
  method: 'mollie' | 'coinbase'
) {
  if (method === 'mollie') {
    const redirectUrl = await vendure.createMolliePaymentIntent(
      `mollie-payment-${process.env.GRIDSOME_VENDURE_TOKEN}`
    );
    window.location.replace(redirectUrl);
  } else if (method === 'coinbase') {
    const redirectUrl = await vendure.createCoinbasePaymentIntent();
    window.location.replace(redirectUrl);
  } else {
    throw Error(`Invalid payment method given: ${method}`);
  }
}
