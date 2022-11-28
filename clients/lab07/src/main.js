import Buefy from 'buefy';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import 'pinelab-storefront-client/lib/ministore/styles.css';
import '@fontsource/raleway';
import { configureVue } from 'pinelab-storefront-client';
import '~/theme.scss';
import Basket from 'pinelab-storefront/lib/components/Basket';

export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy);
  Vue.component('DefaultLayout', DefaultLayout);
  Vue.component('Basket', Basket);
  configureVue(Vue, { router, head, isClient });
}
