import 'buefy/dist/buefy.css';
import Buefy from 'buefy';
import Layout from '~/layouts/Default.vue';
import { configureVue } from 'pinelab-storefront-client';
import '~/theme.scss';
import PopupImage from 'pinelab-storefront-client/lib/buefy-components/PopupImage';
import VueGtag from 'vue-gtag';
import '@fontsource/open-sans-condensed/700.css';
import '@fontsource/open-sans';
import '@fontsource/lora';
import ClickableEmail from './components/ClickableEmail';

export default function (Vue, { router, head, isClient }) {
  if (isClient) {
    Vue.use(
      VueGtag,
      {
        config: {
          id: 'G-S9BE2BG5NQ',
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
  Vue.component('Layout', Layout);
  Vue.component('PopupImage', PopupImage);
  Vue.component('ClickableEmail', ClickableEmail);
  configureVue(Vue, { router, head, isClient });
}
