import { ComputedRef, Ref } from 'vue';
export type LayoutKey = 'default-layout';
declare module '/home/martijn/git/shops/clients/nuxt/node_modules/nuxt/dist/pages/runtime/composables' {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>;
  }
}
