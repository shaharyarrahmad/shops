// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import config from 'shared-components/config';
import DefaultLayout from '~/layouts/Default.vue'
import 'shared-components/styles.css';
import '@fontsource/roboto-mono'

export default function (Vue, {router, head, isClient}) {
    if (isClient) {
        console.log('Loading external scripts', isClient);
        /*        window.$ = require('shared-components/jquery.min.js');
                window.Foundation = require('shared-components/foundation.min.js');*/
    }
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);
    config.configureVue(Vue);
}