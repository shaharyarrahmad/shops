[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)


# Pinelab Shop
Pinelab believes ecommerce expertise can be for anyone. 
The Pinelab Shop provides all business owners an eCommerce platform, with all the best practices included, for selling online.
  
The Pinelab Shop is a multi-customer SaaS webshop built with Index and Angular. 
1. `storefront` contains the Angular storefront. This storefront is use in static hosted HTML files. 
An example can be found in `demo-shop/index.html`
1. `vendure` contains the vendure backend. The backend uses Index's channel feature to support multiple customers.

Visit [Pinelab.studio](https://pinelab.studio/webshop) for more info.

## :round_pushpin: Roadmap for Februari 2021
1. Export tax summary over given period 

## :scroll: Release notes

### Jan 2021
1. Using Gridsome for static storefront
1. Upgraded to 0.18.1
1. Added a webhook plugin to trigger Gridsome builds on configured events  
![Webhook](packages/vendure-plugin-webhook/webhook-admin-ui.jpeg)

### Dec 7 2020
1. SOLD OUT for products that are out of stock
1. Upgrade to Index 0.17.1    
![Sold out](docs/sold-out.jpeg)

### Nov 15 2020
1. Added Collections in storefront for grouping products
1. Added support for up to 5 images per product variant   
![Collections](docs/collections.jpeg)
![Multiple images](docs/multiple-images.jpeg)

### Nov 1 2020
First shop live! :rocket:

### Oct 1 2020
Demo shop live. [Check it out](https://pinelab-demo-shop.netlify.app/)