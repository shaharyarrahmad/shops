import 'buefy/dist/buefy.css';
import Buefy from 'buefy';
import Layout from '~/layouts/Default.vue';
import { configureVue } from 'pinelab-storefront-client';
import '~/theme.scss';
import '@fontsource/roboto';
import QuantityInput from 'pinelab-storefront-client/lib/buefy-components/QuantityInput';
import PopupImage from 'pinelab-storefront-client/lib/buefy-components/PopupImage';

export default function (Vue, { router, head, isClient }) {
  // page transition
  router.afterEach((to, from) => {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    to.meta.transitionName =
      toDepth > fromDepth ? 'slide-next' : 'slide-previous';
  });
  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('Layout', Layout);
  Vue.component('PopupImage', PopupImage);
  configureVue(Vue, { router, head, isClient });
}
