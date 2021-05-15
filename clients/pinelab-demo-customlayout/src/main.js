// import Buefy from 'buefy';
import {
  Button,
  Checkbox,
  Dropdown,
  Field,
  Icon,
  Image,
  Input,
  Loading,
  Menu,
  Navbar,
  Numberinput,
  Radio,
  Select,
  Snackbar,
  Steps,
  Table,
  Tooltip,
} from 'buefy';
import Layout from '~/layouts/Default.vue';
import '~/theme.scss';
import '@fontsource/work-sans';
import { configureVue } from 'pinelab-storefront-client';
import QuantityInput from 'pinelab-storefront-client/lib/buefy-components/QuantityInput';

export default function (Vue, { router, head, isClient }) {
  [
    Button,
    Checkbox,
    Dropdown,
    Field,
    Icon,
    Image,
    Input,
    Loading,
    Menu,
    Navbar,
    Numberinput,
    Radio,
    Select,
    Snackbar,
    Steps,
    Table,
    Tooltip,
  ].forEach((component) => Vue.use(component));
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('Layout', Layout);
  configureVue(Vue, { router, head, isClient });
}
