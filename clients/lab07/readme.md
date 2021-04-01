# Pinelab Storefront client template
Pinelab shop temaplate. Uses the pinelab-storefront-client library for static page generation and Vue Components.

## Setup a new shop
In the example below `demo` is the channelToken
1. Create a new site in Netlify
1. Create a build hook and add the URL in the Vendure Admin
1. Copy this folder to `clients/new-name`
1. Create a new channel in the Vendure API
1. Create shipping methods, usually default and pick up
1. Add products and categories
1. Create a `.env` in the root of the project with the following content:
    ```
    GRIDSOME_VENDURE_API=https://api.pinelab.studio/shop-api
    GRIDSOME_VENDURE_TOKEN=demo 
    ```
1. Run `yarn gridsome develop` as test
1. Add paymentmethod in Vendure with name and code `mollie-payment-demo`
1. Create channel-config in Vendure DB
1. Replace logo's in `static` folder
1. Add footer data like Chamber of commerceNr and privacy policy etc. 
1. `yarn`
1. `yarn gridsome develop`
1. Go to localhost