import { VueContext } from 'pinelab-storefront';

declare module 'vue' {
  export default interface Vue extends VueContext {
    // Custom declarations here
  }
}
