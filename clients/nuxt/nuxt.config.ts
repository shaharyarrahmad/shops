import { defineNuxtConfig } from 'nuxt';
import { prepareData } from './prepare-data';

const vendureShopApi = process.env?.NUXT_ENV_VENDURE_API;
const channelToken = process.env?.NUXT_ENV_VENDURE_TOKEN;
const dataFile = `${__dirname}/server/_shopdata.json`;
let routes: string[] = [];

export default defineNuxtConfig({
  target: 'static',
  typescript: { typeCheck: true },
  hooks: {
    'app:resolve': async () => {
      routes = await prepareData({
        dataFilePath: dataFile,
        channelToken,
        vendureShopApi,
      });
      console.log(routes);
    },
  },
  generate: {
    routes,
  },
  runtimeConfig: {
    dataFile,
    public: {
      vendureShopApi,
      channelToken,
    },
  },
});
