<template>
  <div style="font-family: 'Roboto mono', monospace">
    <div class="grid-x grid-padding-x">
      <div class="cell show-for-large large-3"></div>
      <div class="cell small-12 large-6">
        <g-link to="/">
          <img
            src="/logo.svg"
            alt="LAB07 logo"
            style="padding: 20px; width: 100%"
          />
        </g-link>
      </div>
      <div class="cell show-for-large large-3"></div>
    </div>

    <div class="grid-x grid-padding-x">
      <div class="cell show-for-large large-3"></div>
      <div class="cell small-12 large-6">
        <div class="container">
          <NavBar />

          <slot />
          <br />
          <br />
          <br />
          <div class="text-center footer-text">
            <a :href="global.instagram" target="_blank">
              <i class="fi-social-instagram" style="font-size: 1rem"></i>
            </a>
            • {{ global.name }} • KVK {{ global.kvk }} • {{ global.email }} •
            <a href="/privacy.pdf" target="_blank">privacy</a> •
            <a href="/voorwaarden.pdf" target="_blank"
              >algemene voorwaarden en levering</a
            >
            •
            <a href="https://pinelab.studio/" target="_blank"
              >Made with ❤ by pinelab</a
            >
          </div>
        </div>
      </div>
      <div class="cell show-for-large large-3"></div>
    </div>
  </div>
</template>
<script>
import { NavBar } from 'pinelab-storefront-client/lib/ministore';
import global from '../global.json';

export default {
  components: {
    NavBar,
  },
  data: () => ({ global }),
};
</script>
<style>
.footer-text {
  color: gray;
  font-size: 0.7rem;
  font-family: 'Roboto mono', monospace;
}
</style>
