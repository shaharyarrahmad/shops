<template>
  <Layout>
    <div class="bio">
      <h3>Over Daniël van de Haterd</h3>
      <p>
        Je loopt geregeld zijn street art tegen het lijf rondom Amersfoort.
        Daniël van de Haterd werkt al ruim 15 jaar als graffiti kunstenaar...
        <g-link to="/bio/">Lees meer</g-link>
      </p>
    </div>
    <ProductOverview />
  </Layout>
</template>
<style>
.bio {
  font-size: 0.7rem;
  margin-bottom: 50px;
}
</style>
<script>
import { ProductOverview } from 'shared-components';

export default {
  components: {
    ProductOverview,
  },
};
</script>
