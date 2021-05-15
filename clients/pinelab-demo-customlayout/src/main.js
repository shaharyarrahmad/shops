import Buefy from 'buefy';
// import { Navbar } from 'buefy';
import Layout from '~/layouts/Default.vue';
import '~/theme.scss';
import '@fontsource/work-sans';
import { configureVue } from 'pinelab-storefront-client';
import AsyncImage from 'pinelab-storefront-client/lib/buefy-components/AsyncImage';
import QuantityInput from 'pinelab-storefront-client/lib/buefy-components/QuantityInput';

export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy);
  // Vue.use(Navbar);
  Vue.component('AsyncImage', AsyncImage);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('Layout', Layout);
  configureVue(Vue, { router, head, isClient });
}
