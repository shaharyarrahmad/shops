// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import config from 'shared-components/config';
import Layout from '~/layouts/Default.vue'
import 'shared-components/styles.css';
import '@fontsource/roboto-mono'

export default function (Vue, {router, head, isClient}) {
    // Set default layout as a global component
    Vue.component('Layout', Layout)
    config.configureVue(Vue, isClient);
}