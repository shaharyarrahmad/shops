declare module '*.vue' {
  import Vue from 'vue';
  import { VueContext } from 'pinelab-storefront';
  export default Vue & VueContext;
}
