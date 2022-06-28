# Pinelab storefront

This package holds:

1. Reusable Vue components to compose storefronts.
2. Vendure logic for generating static pages serverside.
3. VendureClient for use on the client/browser.

## Labels

The Vue components use labels from a `labels.json` in the root of your project. Whenever a button or field shows
something like `order-summary.title`, it means you don't have it defined in your labels file.

```json
{
  "basket": {
    "title": "Winkelmand",
    "shipping-cost": "Verzendkosten",
    "total": "Totaal",
    "go-to-cart": "Naar winkelmand",
    "go-to-checkout": "Bestellen",
    "empty-cart": "Je winkelmand is leeg... "
  }
}
```

## Components

Components are standalone, they are unaware of any Vue context. The dependencies they use are passed in as Vue
properties. Components often depend on `VendureClient` to handle common Vendure logic like adding to cart or checking
out an order.

```vue

<template>
  <CustomerDetailsForm
    :available-countries="availableCountries"
    :vendure="vendure"
    @back="history.back()"
    @submit="gotToShipping()"
  />
</template>
```

## Vendure Client

This package also holds the `VendureClient`, which is used to communicate with Vendure from the client/browser.

## Vendure Server

The `VendureServer` is used for fetching data from Vendure during static site generation on the server.
