import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Layout from '~/layouts/Default.vue';
import { configureVue } from 'pinelab-storefront-client';
import '~/theme.scss';
import '@fontsource/work-sans';
import ProductCard from './components/ProductCard';
import AsyncImage from './components/AsyncImage';
import CartOverview from './components/CartOverview';
import QuantityInput from './components/QuantityInput';
import Breadcrumb from './components/Breadcrumb';

export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy);
  Vue.component('Layout', Layout);
  Vue.component('ProductCard', ProductCard);
  Vue.component('AsyncImage', AsyncImage);
  Vue.component('CartOverview', CartOverview);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('Breadcrumb', Breadcrumb);
  configureVue(Vue, { router, head, isClient });
}
