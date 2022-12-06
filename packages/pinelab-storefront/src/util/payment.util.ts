import { ShopClient } from '../vendure/shop.client';

export async function startPayment(
  client: ShopClient,
  method: 'mollie' | 'coinbase'
) {
  if (method === 'mollie') {
    const redirectUrl = await client.createMolliePaymentIntent(
      `mollie-payment-${process.env.GRIDSOME_VENDURE_TOKEN}`
    );
    window.location.replace(redirectUrl);
  } else if (method === 'coinbase') {
    const redirectUrl = await client.createCoinbasePaymentIntent();
    window.location.replace(redirectUrl);
  } else {
    throw Error(`Invalid payment method given: ${method}`);
  }
}
