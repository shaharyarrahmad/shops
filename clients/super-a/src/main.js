import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Layout from '~/layouts/Default.vue';
import '~/theme.scss';
import '@fontsource/montserrat';
import { configureVue } from 'pinelab-storefront-client';
import QuantityInput from 'pinelab-storefront-client/lib/buefy-components/QuantityInput';
import PopupImage from 'pinelab-storefront-client/lib/buefy-components/PopupImage';
import VueGtag from 'vue-gtag';

export default function (Vue, { router, head, isClient }) {
  if (isClient && process.env.GRIDSOME_ENABLE_MOBILE_CONSOLE) {
    require('outfront').default();
    console.log('OutfrontJS mobile logging enabled');
  }
  if (isClient) {
    Vue.use(
      VueGtag,
      {
        config: {
          id: 'G-RSXZBW7FVM',
          params: {
            anonymize_ip: true,
          },
        },
        bootstrap: false,
      },
      router
    );
  }
  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('Layout', Layout);
  Vue.component('PopupImage', PopupImage);
  configureVue(Vue, { router, head, isClient });
  Vue.filter('formatDate', function (date) {
    if (date) {
      return new Date(date).toLocaleDateString('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  });
  Vue.mixin({
    methods: {
      getDefaultImage: (id) =>
        `${process.env.GRIDSOME_DIRECTUS_HOST}/assets/${id}?key=default`,
      getSquareImage: (id) =>
        `${process.env.GRIDSOME_DIRECTUS_HOST}/assets/${id}?key=square`,
    },
  });
}
