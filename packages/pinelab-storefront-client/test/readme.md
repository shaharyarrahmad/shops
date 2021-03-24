# Pinelab Storefront client template
Pinelab shop temaplate. Uses the pinelab-storefront-client library for static page generation and Vue Components.

## Setup a new shop
In the example below `demo` is the channelToken
1. Copy this folder to `clients/new-name`
1. Create a new channel in the Vendure API
1. Add paymentmethod in Vendure with name and code `mollie-payment-demo`
1. Create shipping methods, usually default and pick up
1. Add products and categories
1. Create a `.env` in the root of the project with the following content:
    ```
    GRIDSOME_VENDURE_API=https://api.pinelab.studio/shop-api
    GRIDSOME_VENDURE_TOKEN=demo 
    ```
1. `yarn`
1. `yarn gridsome develop`
1. Go to localhost