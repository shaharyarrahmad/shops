import Layout from '~/layouts/Default.vue';
import { configureVue } from 'pinelab-storefront-client';

export default function (Vue, { router, head, isClient }) {
  Vue.component('Layout', Layout);
  configureVue(Vue, { router, head, isClient });
}
