import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Layout from '~/layouts/Default.vue';
import { configureVue } from 'pinelab-storefront-client';
import '~/theme.scss';
import '@fontsource/work-sans';


export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy);
  Vue.component('Layout', Layout);
  configureVue(Vue, { router, head, isClient });
}
