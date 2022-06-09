import { defineNuxtConfig } from 'nuxt';
import { prepareData, PreparedData } from './prepare-data';
import fs from 'fs';

const vendureShopApi = process.env?.NUXT_ENV_VENDURE_API;
const channelToken = process.env?.NUXT_ENV_VENDURE_TOKEN;
const dataFilePath = `${__dirname}/content/shop.json`;
const isDuringBuild = process.argv[2] === 'build';

let shopData: PreparedData;
if (!isDuringBuild) {
  try {
    shopData = require(dataFilePath);
  } catch (e) {
    throw Error(`${dataFilePath} not found. Run 'yarn build' first.`);
  }
}

export default defineNuxtConfig({
  target: 'static',
  typescript: { typeCheck: true },
  modules: ['@nuxt/content'],
  hooks: {
    'build:error': (e) => console.error(e),
    'build:before': async () => {
      if (isDuringBuild) {
        const shopData = await prepareData(vendureShopApi, channelToken);
        fs.writeFileSync(dataFilePath, JSON.stringify(shopData));
      }
    },
  },
  generate: {
    routes: shopData?.routes,
  },
  runtimeConfig: {
    dataFilePath,
    public: {
      vendureShopApi,
      channelToken,
    },
  },
  css: ['theme.scss'],
});
