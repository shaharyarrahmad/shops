# ActiveOrder

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

## Slots

| Name    | Description | Bindings                                                                                                                                                                                                                                                                                    |
| ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default |             | **nrOfItems** `number` - The total items currently in the active order<br/>**orderLines** `array` - The order lines of the active order. Returns an empty array if no active order or no order lines<br/>**activeOrder** `OrderFieldsFragment` - The complete activeOrder. Can be undefined |

---
