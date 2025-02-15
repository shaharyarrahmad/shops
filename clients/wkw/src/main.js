import Buefy from 'buefy';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import '~/theme.scss';
import QuantityInput from 'pinelab-storefront/lib/components/QuantityInput';
import PopupImage from 'pinelab-storefront/lib/components/PopupImage';
import '@fontsource/poppins';
import {
  formatEuro,
  preconnectLinks,
  createLabelFunction,
  setStore,
} from 'pinelab-storefront';

export default function (Vue, { router, head, isClient }) {
  head.link.push(...preconnectLinks);
  Vue.prototype.$l = createLabelFunction([
    require('../labels/nl.json'),
    require('../labels/en.json'),
  ]);
  Vue.filter('euro', formatEuro);
  if (isClient) {
    setStore(
      Vue,
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
  }
  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('DefaultLayout', DefaultLayout);
  Vue.component('PopupImage', PopupImage);
}
