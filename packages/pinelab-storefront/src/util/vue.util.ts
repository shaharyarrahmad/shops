import { Store } from '../vendure/types';
import Vue from 'vue';
import mitt from 'mitt';
import { VendureClient } from '../vendure/vendure.client';

/**
 * Format Vendure's integer (1233) to euro format: €12,33
 */
export function formatEuro(value?: number) {
  console.log('formatcalled', value);
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
export function setStore(vue: typeof Vue, url: string, channelToken: string) {
  const store = vue.observable<Store>({
    activeOrder: undefined,
  });
  vue.prototype.$vendure = new VendureClient(store, url, channelToken);
  vue.prototype.$store = store;
  vue.prototype.$emitter = mitt();
}

/**
 * Adds a global function `$l('your.label')` to the Vue instance to get the displayLabel
 */
export function setLabelFunction(vue: typeof Vue, labels: any) {
  vue.prototype.$l = (key: string) => {
    const [group, labelKey] = key.split('.');
    return labels[group]?.[labelKey] || key;
  };
}
