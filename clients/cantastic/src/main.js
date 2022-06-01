import 'buefy/dist/buefy.css';
import Buefy from 'buefy';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import { configureVue } from 'pinelab-storefront-client';
import '@fontsource/roboto/900.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/400.css';
import '@fontsource/open-sans';
import '~/theme.scss';
import QuantityInput from 'pinelab-storefront-client/lib/buefy-components/QuantityInput';
import PopupImage from 'pinelab-storefront-client/lib/buefy-components/PopupImage';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';

export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('DefaultLayout', DefaultLayout);
  Vue.component('PopupImage', PopupImage);
  Vue.component('ProductCard', ProductCard);
  Vue.component('CategoryCard', CategoryCard);
  configureVue(Vue, { router, head, isClient });
  Vue.mixin({
    methods: {
      maybeThumbnail(asset) {
        return asset?.thumbnail;
      },
    },
  });
  if (isClient && process.env.GRIDSOME_ENABLE_MOBILE_CONSOLE) {
    require('outfront').default();
    console.log('OutfrontJS mobile logging enabled');
  }
  Vue.mixin({
    methods: {
      getDefaultImage: (id) =>
        `${process.env.GRIDSOME_DIRECTUS_HOST}/assets/${id}?key=default`,
      getSquareImage: (id) =>
        `${process.env.GRIDSOME_DIRECTUS_HOST}/assets/${id}?key=square`,
    },
  });
  Vue.filter('formatDate', function (date) {
    if (date) {
      return new Date(date).toLocaleDateString('nl', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  });
}
