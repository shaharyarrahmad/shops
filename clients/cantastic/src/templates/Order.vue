<template>
  <DefaultLayout>
    <template #content>
      <OrderConfirmation />
    </template>
  </DefaultLayout>
</template>
<script>
import OrderConfirmation from 'pinelab-storefront/lib/ui/organisms/OrderConfirmation';

export default {
  components: {
    OrderConfirmation,
  },
};
</script>
