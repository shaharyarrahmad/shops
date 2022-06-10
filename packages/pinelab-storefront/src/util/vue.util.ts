import { Store } from '../vendure/types';
import Vue from 'vue';
import mitt from 'mitt';
import { VendureClient } from '../../../pinelab-storefront-client';

/**
 * Format Vendure's integer (1233) to euro format: €12,33
 */
export function formatEuro(value?: number) {
  if (!value) {
    value = 0;
  }
  const currencyString =
    value < 0
      ? `- €${Math.abs(value / 100)
          .toFixed(2)
          .replace('.', ',')}`
      : `€${(value / 100).toFixed(2).replace('.', ',')}`;
  if (currencyString.endsWith('00')) {
    return currencyString.replace(new RegExp('00$'), '-');
  }
  return currencyString;
}

/**
 * Set global store, vendure client and event emitter
 */
export function setStore(vue: typeof Vue) {
  const store = vue.observable<Store>({
    activeOrder: undefined,
  });
  vue.prototype.$vendure = new VendureClient(store);
  vue.prototype.$store = store;
  vue.prototype.$emitter = mitt();
}
