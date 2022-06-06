import { defineNuxtPlugin } from 'nuxt/app';
import { formatEuro } from 'pinelab-storefront';

export default defineNuxtPlugin((nuxtApp) => {
  console.log(formatEuro);
  nuxtApp.vueApp.provide('$euro', (value) => console.log('VALUEEE'));
})