# Pinelab storefront UI components
Bulma/buefy components used for the Pinelab storefronts

## Guidelines

### Molecules
Molecules should not use VendureClient or Store instances. Instead, pass properties into the component:
```js
// Image molecule
export default {
  props: ['small', 'alt', 'large', 'placeholder'],
};
```

### Organisms
Organisms can fetch data via VendureClient and store values in the Store, but both should be injected. No implicit access via `$context`!.
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