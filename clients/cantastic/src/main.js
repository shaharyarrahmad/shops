import Buefy from 'buefy';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import '@fontsource/roboto/900.css';
import '@fontsource/roboto/400.css';
import '@fontsource/open-sans';
import '~/theme.scss';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import {
  preconnectLinks,
  setLabelFunction,
  setStore,
} from 'pinelab-storefront';
import QuantityInput from 'pinelab-storefront/lib/components/QuantityInput';
import PopupImage from 'pinelab-storefront/lib/components/PopupImage';
import VueGtag from 'vue-gtag';

export default function (Vue, { router, head, isClient }) {
  head.link.push(...preconnectLinks);
  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('DefaultLayout', DefaultLayout);
  Vue.component('PopupImage', PopupImage);
  Vue.component('ProductCard', ProductCard);
  Vue.component('CategoryCard', CategoryCard);
  if (isClient) {
    if (isClient) {
      Vue.use(
        VueGtag,
        {
          config: {
            id: 'G-HSHBS7YZDM',
            params: {
              anonymize_ip: true,
            },
          },
          bootstrap: false,
        },
        router
      );
    }
    setStore(
      Vue,
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    router.beforeEach((to, from, next) => {
      Vue.prototype.$emitter.emit('loading');
      next();
    });
    router.afterEach((to, from) => {
      Vue.prototype.$emitter.emit('finishedLoading');
    });
    if (process.env.GRIDSOME_ENABLE_MOBILE_CONSOLE) {
      require('outfront').default();
      console.log('OutfrontJS mobile logging enabled');
    }
  }
  setLabelFunction(Vue, require('../labels.json'));
  Vue.mixin({
    methods: {
      maybeThumbnail(asset) {
        return asset?.thumbnail;
      },
      maybePreview(asset) {
        return asset?.preview;
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
        ? `-${Math.abs(value / 100)
            .toFixed(2)
            .replace('.', ',')}`
        : `${(value / 100).toFixed(2).replace('.', ',')}`;
    /*    if (currencyString.endsWith('00')) {
      return currencyString.replace(new RegExp('00$'), '-');
    }*/
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
