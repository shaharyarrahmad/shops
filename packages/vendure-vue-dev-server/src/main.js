import { createApp } from 'vue';
import App from './App.vue';
import ActiveOrder from 'vendure-vue-components/lib/components/ActiveOrder.vue';
import * as dingen from 'vendure-vue-components';
import { reactive } from 'vue';

console.log(dingen);

const app = createApp(App);
app.component('ActiveOrder', ActiveOrder);
app.config.globalProperties.$store = { test: 'testnig' };

// Vendure vue components config
const store = reactive({
  activeOrder: undefined,
});
vue.prototype.$vendure = new VendureClient(store, url, channelToken);
vue.prototype.$store = store;
vue.prototype.$emitter = mitt();

app.mount('#app');
