# Pinelab storefront UI components

Bulma/buefy components used for the Pinelab storefronts

## Guidelines

### Components

Components are standalone, they are unaware of any Vue context. They should only use properties that are passed in.

```js
// Cart organism
export default {
  props: {
    vendure: VendureClient,
  },
  methods: {
    async getActiveOrder() {
      await this.vendure.getActiveOrder();
      // This is wrong: this.$context.vendure...
    }
  }
}
```

### Pages

Pages consist of components. Pages can use the global `$l()` function to retrieve labels. See VueUtil.setLabelFunction()
for more info.