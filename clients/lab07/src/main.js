import Buefy from 'buefy';
import Layout from '~/layouts/Default.vue';
import 'pinelab-storefront-client/lib/ministore/styles.css';
import '@fontsource/raleway';
import { configureVue } from 'pinelab-storefront-client';
import '~/theme.scss';

export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy);
  Vue.component('Layout', Layout);
  configureVue(Vue, { router, head, isClient });
}
