<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [1 Vendure Vue Components](#1-vendure-vue-components)
  - [why?](#why)
  - [Vue setup](#vue-setup)
  - [Component usage](#component-usage)
  - [Additional GraphQL fields](#additional-graphql-fields)
- [2 Components](#2-components)
  - [ActiveOrder](#activeorder)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 1 Vendure Vue Components

This package contains so called 'Renderless Vue components'. This means that these components only contain business logic,
no markup or styling.

## why?
// todo flexible, extendible, sensible defaults

## Vue setup

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

## Component usage

// TODO 1 example of a component + link to all component docs

## Additional GraphQL fields

// TODO how to fetch additional GraphQL fields

# 2 Components

## ActiveOrder

> Component to display the items in the current active order (cart).

Usage:

```vue
<ActiveOrder v-slot="{ nrOfItems, orderLines }">
  <a href="/cart/">Go to cart ( {{ nrOfItems }} )</a>
  <ul>
   <li v-for="line of orderLines"> {{ line.name }} - {{ line.quantity }}x </li>
  </ul>
</ActiveOrder>
```

### Slots

| Name    | Description | Bindings                                                                                                                                                                                                                                                                                    |
| ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default |             | **nrOfItems** `number` - The total items currently in the active order<br/>**orderLines** `array` - The order lines of the active order. Returns an empty array if no active order or no order lines<br/>**activeOrder** `OrderFieldsFragment` - The complete activeOrder. Can be undefined |

---
