import { defineNuxtPlugin, NuxtApp } from 'nuxt/app';
import { emitter, formatEuro, store, VendureClient } from 'pinelab-storefront';

export interface AppContext extends NuxtApp {
  $vendure: VendureClient;
  $emitter: typeof emitter;
  $store: typeof store;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  nuxtApp.vueApp.config.globalProperties.$filters = {
    euro: formatEuro,
  };
  if (process.client) {
    try {
      nuxtApp.provide('store', store);
      nuxtApp.provide('emitter', emitter);
      nuxtApp.provide(
        'vendure',
        new VendureClient(store, config.vendureShopApi, config.channelToken)
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
});
