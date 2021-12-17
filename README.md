[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# Pinelab Shop platform
Single backend with multiple storefronts.

## Setting up a new shop

### Vendure setup
1. Create channel
2. Create products
3. Set channel-config in DB with script
4. Create paymentMethod with code `mollie-payment-demo`
5. Create shippingMethods
6. Create admin user for channel
7. Login as the admin and setup dashboard

### Storefront setup
1. Create a new site in Netlify
2. Create a build hook and add the URL in the Vendure Admin
3. Copy this folder to `clients/demo`
4. Set variables in `.env`
5. Run `yarn gridsome develop` as test
6. Replace logo's in `static` folder
7. Add footer data like Chamber of commerceNr and privacy policy etc.
8. Set up 404 page

### Optional steps
1. Storefront SEO for products
2. Redirects from old website