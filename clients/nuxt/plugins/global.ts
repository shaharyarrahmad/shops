import { defineNuxtPlugin, NuxtApp } from 'nuxt/app';
import { formatEuro, Store, VendureClient } from 'pinelab-storefront';
import mitt, { Emitter } from 'mitt';

export interface AppContext extends NuxtApp {
  $vendure: VendureClient,
  $emitter: Emitter<any>,
  $store: Store,
}

export default defineNuxtPlugin((nuxtApp) => {
  try {
    const config = useRuntimeConfig().public

    nuxtApp.vueApp.config.globalProperties.$filters = {
      euro: formatEuro
    };

    if (process.client) {
      const store = reactive<Store>({
        activeOrder: undefined
      });
      nuxtApp.provide('store', store);
      nuxtApp.provide('emitter', mitt());
      nuxtApp.provide('vendure', new VendureClient(store, config.vendureShopApi, config.channelToken));
    }

  } catch (e) {
    console.error(`Global plugin setup failed on ${process.server ? 'server' : 'client'}`);
    console.error(e);
  }
});