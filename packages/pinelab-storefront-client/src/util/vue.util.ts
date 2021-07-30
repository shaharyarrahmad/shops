import { VendureClient } from '..';
import { VueConstructor } from 'vue';
import { Store } from '../vendure/store';
import mitt from 'mitt';
import { debounce } from 'debounce';

/**
 * Sets google storage prefetch and global Vue stuff like filters and store
 */
export function configureVue(
  Vue: VueConstructor,
  { router, head, isClient }: any
): void {
  // DNS prefetch for images from storage
  head.link.push({
    rel: 'dns-prefetch',
    href: '//storage.googleapis.com',
  });
  head.link.push({
    rel: 'preconnect',
    href: 'https://storage.googleapis.com',
  });

  // Add euro filter for global use
  Vue.filter('euro', function (value: number, format: string) {
    if (!value) {
      value = 0;
    }
    const currencyString =
      value < 0
        ? `- €${Math.abs(value / 100)
            .toFixed(2)
            .replace('.', ',')}`
        : `€${(value / 100).toFixed(2).replace('.', ',')}`;
    if (currencyString.endsWith('00') && !format) {
      return currencyString.replace(new RegExp('00$'), '-');
    }
    return currencyString;
  });
  // Add debounce as global
  Vue.mixin({
    methods: {
      debounce,
    },
  });

  // Set global store and vendure service
  if (isClient) {
    const store = Vue.observable<Store>({
      activeOrder: undefined,
    });
    Vue.prototype.$vendure = new VendureClient(store);
    Vue.prototype.$store = store;
    Vue.prototype.$emitter = mitt();
  }
}
