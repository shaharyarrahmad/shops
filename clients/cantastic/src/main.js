import 'buefy/dist/buefy.css';
import Buefy from 'buefy';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import '@fontsource/roboto/900.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/400.css';
import '@fontsource/open-sans';
import '~/theme.scss';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import { preconnectLinks, setStore } from 'pinelab-storefront';
import QuantityInput from 'pinelab-storefront/lib/molecules/QuantityInput';
import PopupImage from 'pinelab-storefront/lib/molecules/PopupImage';

export default function (Vue, { router, head, isClient }) {
  head.link.push(...preconnectLinks);
  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('DefaultLayout', DefaultLayout);
  Vue.component('PopupImage', PopupImage);
  Vue.component('ProductCard', ProductCard);
  Vue.component('CategoryCard', CategoryCard);
  if (isClient) {
    // TODO VueGtag
    setStore(Vue);
    if (process.env.GRIDSOME_ENABLE_MOBILE_CONSOLE) {
      require('outfront').default();
      console.log('OutfrontJS mobile logging enabled');
    }
  }
  Vue.mixin({
    methods: {
      maybeThumbnail(asset) {
        return asset?.thumbnail;
      },
    },
  });
  // Get image by ID from directus
  Vue.mixin({
    methods: {
      getDefaultImage: (id) =>
        `${process.env.GRIDSOME_DIRECTUS_HOST}/assets/${id}?key=default`,
      getSquareImage: (id) =>
        `${process.env.GRIDSOME_DIRECTUS_HOST}/assets/${id}?key=square`,
    },
  });
  Vue.filter('euro', function (value) {
    if (!value) {
      value = 0;
    }
    const currencyString =
      value < 0
        ? `- ${Math.abs(value / 100)
            .toFixed(2)
            .replace('.', ',')}`
        : `${(value / 100).toFixed(2).replace('.', ',')}`;
    if (currencyString.endsWith('00')) {
      return currencyString.replace(new RegExp('00$'), '-');
    }
    return currencyString;
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
