import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Layout from '~/layouts/Default.vue';
import { configureVue } from 'pinelab-storefront-client';
import '~/theme.scss';
import '@fontsource/work-sans';
import ProductCard from './components/ProductCard';
import AsyncImage from './components/AsyncImage';
import CartOverview from './components/CartOverview';

export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy, {defaultLinkTags: 'g-link'});
  Vue.component('Layout', Layout);
  Vue.component('ProductCard', ProductCard);
  Vue.component('AsyncImage', AsyncImage);
  Vue.component('CartOverview', CartOverview);
  configureVue(Vue, { router, head, isClient });
}
