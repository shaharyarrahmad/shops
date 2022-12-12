<script>
/**
 * Component to display the items in the current active order (cart).
 *
 * Usage:
 *
 ```vue
 <ActiveOrder v-slot="{nrOfItems, orderLines}">
   <a href="/cart/">Go to cart ( {{ nrOfItems }} )</a>
   <ul>
    <li v-for="line of orderLines"> {{ line.name }} - {{ line.quantity }}x </li>
   </ul>
 </ActiveOrder>
 ```
 */
export default {
  computed: {
    nrOfItems() {
      if (this.$store?.activeOrder?.lines?.length === 0) {
        return 0;
      }
      return (
        this.$store?.activeOrder?.lines
          ?.map((l) => l.quantity)
          ?.reduce((quantity1, quantity2) => quantity1 + quantity2) || 0
      );
    },
    lines() {
      return this.$store?.activeOrder?.lines || [];
    },
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
  },
  /**
   * @slot default
   * @binding {number} nrOfItems  The total items currently in the active order
   * @binding {array} orderLines The order lines of the active order. Returns an empty array if no active order or no order lines
   * @binding { OrderFieldsFragment} activeOrder The complete activeOrder. Can be undefined
   */
  render() {
    return this.$slots.default({
      nrOfItems: this.nrOfItems,
      orderLines: this.lines,
      activerOrder: this.$store?.activeOrder,
    });
  },
};
</script>
