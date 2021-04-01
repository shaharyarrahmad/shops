import Layout from '~/layouts/Default.vue';
import 'pinelab-storefront-client/lib/ministore/styles.css';
import '@fontsource/roboto-mono';
import { configureVue } from 'pinelab-storefront-client';

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', Layout);
  configureVue(Vue, { router, head, isClient });
}
