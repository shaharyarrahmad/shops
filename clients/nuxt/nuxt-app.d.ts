import { Store, VendureClient } from 'pinelab-storefront';
import { Emitter } from 'mitt';

declare module '#app' {
  interface NuxtApp {
    $vendure: VendureClient,
    $emitter: Emitter<any>,
    $store: Store,
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vendure: VendureClient,
    $emitter: Emitter<any>,
    $store: Store,
  }
}

export { }