# Pinelab storefront

This package holds:
1. Vue components 

## Labels
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

Components are standalone, they are unaware of any Vue context. The dependencies they use are passed in as Vue properties:

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

## Pages

Pages consist of components. Pages can use the global `$l()` function to retrieve labels. See VueUtil.setLabelFunction()
for more info.