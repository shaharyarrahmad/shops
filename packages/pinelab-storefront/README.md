# Pinelab storefront

This package holds:

1. Reusable Buefy Vue components to compose storefronts.
2. Vendure logic for generating static pages serverside.
3. VendureClient for use on the client/browser.

## Components

You can import reusable Buefy components to build a storefront:

```vue

<template>
  <CustomerDetailsForm
    :available-countries="availableCountries"
    @back="history.back()"
    @submit="gotToShipping()"
  />
</template>
<script>
import OrderSummary from 'pinelab-storefront/lib/components/OrderSummary';

export default {
  components: { OrderSummary }
};
</script>
```

Checkout `src/components/` for more Buefy components.

## Labels

The Vue components use labels from a `labels.json` in the root of your project. Whenever a button or field shows
something like `order-summary.title`, it means you don't have it defined in your labels file. Add this to your `main.js`
file to enable labels:

```js
import { setLabelFunction } from 'pinelab-storefront';

setLabelFunction(Vue, require('../labels.json'));
```

You can now use `$l('basket.title')` in your Vue HTML and it will display `Winkelmand`.

```json
// labels.json in root of your storefront
{
  "basket": {
    "title": "Winkelmand",
    "shipping-cost": "Verzendkosten"
  }
}
```

## Vendure Client

Create a Vendure client to communicate with Vendure on the client side. For example for adding products to cart. Add
this to your `main.js` to make the Vendure client available in your Vue app:

```js
import { setStore } from 'pinelab-storefront';

setStore(
  Vue,
  process.env.GRIDSOME_VENDURE_API,
  process.env.GRIDSOME_VENDURE_TOKEN
);
```

You can now get the active order of a user like this:

```js
  async
mounted()
{
  await this.$vendure.getActiveOrder();
}
```

Checkout `src/vendure/vendure.client.ts` for more functions of VendureClient.

## Vendure Server

`VendureServer` is mostly used in `gridsome.server.js` to fetch data during build time to build the HTML pages:

```js
const { VendureServer } = require('pinelab-storefront');
const vendureServer = new VendureServer(
  process.env.GRIDSOME_VENDURE_API,
  process.env.GRIDSOME_VENDURE_TOKEN
);
vendureServer.getShopData();
```

## Utilities
// TODO

