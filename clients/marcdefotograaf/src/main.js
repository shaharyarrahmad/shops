// This is the main.js file. Import global CSS and scripts here.
// The Client api can be used here. Learn more: gridsome.org/docs/client-api
import Layout from '~/layouts/Default.vue';
import 'pinelab-storefront-client/lib/ministore/styles.css';
// import '@fontsource/roboto-mono';
import Rollbar from 'rollbar';
import { configureVue } from 'pinelab-storefront-client';

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', Layout);
  configureVue(Vue, { router, head, isClient });
  if (isClient) {
    Vue.prototype.$rollbar = new Rollbar({
      accessToken: '0901f691b650488eb517eae49eb828df',
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: 'marcdefotograaf',
      },
    });
    Vue.config.errorHandler = (err, vm, info) => {
      vm.$rollbar.error(err);
      throw err; // rethrow
    };
  }
}
