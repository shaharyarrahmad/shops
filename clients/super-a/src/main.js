import Buefy from "buefy";
import "buefy/dist/buefy.css";
import Layout from "~/layouts/Default.vue";
import "~/theme.scss";
import "@fontsource/montserrat";
import { configureVue } from "pinelab-storefront-client";
import QuantityInput from "pinelab-storefront-client/lib/buefy-components/QuantityInput";

export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy);
  Vue.component("QuantityInput", QuantityInput);
  Vue.component("Layout", Layout);
  configureVue(Vue, { router, head, isClient });
}
