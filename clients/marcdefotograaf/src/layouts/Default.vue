<template>
  <!--  <div style="font-family: 'Roboto mono', monospace">-->
  <div
    style="font-family: 'Helvetica', 'Nimbus', 'Arial', sans-serif !important"
  >
    <div class="grid-x grid-padding-x">
      <div class="cell show-for-large large-3"></div>
      <div class="cell small-12 large-6 text-center">
        <a href="https://shop.marcdefotograaf.nl" ><img src="/marc_logo_square.png" style="width: 42px; position: absolute;" /></a>
      </div>
      <div class="cell show-for-large large-3"></div>
    </div>

    <div class="grid-x grid-padding-x">
      <div class="cell show-for-large large-3"></div>
      <div class="cell small-12 large-6">
        <div class="container">
          <NavBar />
          <slot />
        </div>
      </div>
      <div class="cell show-for-large large-3"></div>
    </div>

    <div class="grid-x grid-padding-x">
      <div class="cell show-for-large large-3"></div>
      <div class="cell small-12 large-6 text-center">
        <p style="color: gray; font-size: 0.7rem">
          Marc de Fotograaf • KVK 51521784 • info@marcdefotograaf.nl •
          <a href="/voorwaarden.pdf">Voorwaarden</a> •
          <a href="https://pinelab.studio/" target="_blank">❤ by pinelab</a>
        </p>
      </div>
      <div class="cell show-for-large large-3"></div>
    </div>
  </div>
</template>
<script>
import { NavBar } from 'pinelab-storefront-client/lib/ministore';

export default {
  components: {
    NavBar,
  },
  metaInfo() {
    return {
      meta: [
        {
          name: 'description',
          content: 'Webshop van Marc de Fotograaf uit Leeuwarden.',
        },
      ],
    };
  },
};
</script>
<style>
h1,
h2,
h3 {
  font-family: 'Helvetica', 'Nimbus', 'Arial', sans-serif !important;
}
h1 {
  text-decoration: underline;
}
.product-description {
  font-family: 'Helvetica', 'Nimbus', 'Arial', sans-serif !important;
}
.container {
  margin-top: 0 !important;
}
</style>
