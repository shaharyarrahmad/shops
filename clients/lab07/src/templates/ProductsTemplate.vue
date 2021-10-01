<template>
  <Layout>
    <div class="bio">
      <h1>{{ global.aboutTitle }}</h1>
      <div v-html="global.aboutText"></div>
    </div>
    <ProductOverview />
  </Layout>
</template>

<script>
import { ProductOverview } from 'pinelab-storefront-client/lib/ministore';
import global from '../global.json';

export default {
  components: {
    ProductOverview,
  },
  data: () => ({ global }),
};
</script>
<style>
.bio {
  font-size: 0.7rem;
  margin-bottom: 50px;
}
</style>
