import { defineNuxtConfig } from 'nuxt';
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  typescript: { typeCheck: true },
  runtimeConfig: {
    public: {
      vendureShopApi: process.env?.NUXT_ENV_VENDURE_API,
      channelToken: process.env?.NUXT_ENV_VENDURE_TOKEN
    }
  }
});
