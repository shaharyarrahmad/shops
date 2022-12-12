This package contains so called 'Renderless Vue components'. This means that these components only contain business logic,
no markup or styling.

# why?
// todo flexible, extendible, sensible defaults

# Vue setup

Add the following to your Vue's `main.js`:

```js
import { setVueContext } from 'vendure-vue-components';
import Vue from 'vue';

setVueContext(
  Vue,
  'https://your-vendure-instance/shop-api',
  'your-channel-token'
);
```

This will add the following global properties to your Vue instance:

- `$vendure` a Vendure client for communicating with Vendure: Adding products to order, fetch a product, etc.
- `$store` a global store used for storing a customers ActiveOrder.
- `$emitter` an instance of `mitt`: A tiny 200b event emitter used for global events like `Product added to order` or `Out of stock error`

# Component usage

// TODO 1 example of a component + link to all component docs

# Extending the defaults

// TODO how to fetch additional GraphQL fields, wrap the vendureclient
