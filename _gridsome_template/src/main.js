// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import config from 'shared-components/config';
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, {router, head, isClient}) {
    if (isClient) {
        console.log('Loading external scripts', isClient);
        window.$ = require('shared-components/jquery.min');
        window.Foundation = require('shared-components/foundation.min');
    }
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);
    config.configureVue(Vue);
}
