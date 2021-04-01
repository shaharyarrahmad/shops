import Layout from '~/layouts/Default.vue';
import 'pinelab-storefront-client/lib/ministore/styles.css';
import { configureVue } from 'pinelab-storefront-client';
import '@fontsource/roboto-mono';

export default function (Vue, { router, head, isClient }) {
  Vue.component('Layout', Layout);
  configureVue(Vue, { router, head, isClient });
}
