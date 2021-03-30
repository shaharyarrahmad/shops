<template>
  <div style="font-family: 'Roboto mono', monospace">
    <div class="grid-x grid-padding-x">
      <div class="cell show-for-large large-3"></div>
      <div class="cell small-12 large-6">
        <!--<a href="https://marcdefotograaf.nl" style="padding-left: 20px; font-size: 0.7rem;">Bekijk hier Marc's portfolio</a>-->
        <img src="/marcdefotograaf.png" style="padding: 20px; width: 100%" />
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
