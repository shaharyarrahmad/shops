import { ShopData, VendureServer } from 'pinelab-storefront';
import fs from 'fs';

interface PrepareDataInput {
  dataFilePath: string;
  vendureShopApi: string;
  channelToken: string;
}

/**
 * Downloads all products, collections etc from Vendure
 * And optionally mutate/prepare the data here
 */
export async function prepareData({
  dataFilePath,
  vendureShopApi,
  channelToken,
}: PrepareDataInput): Promise<string[]> {
  const routes: string[] = [];
  let shopData: ShopData;
  if (fs.existsSync(dataFilePath)) {
    shopData = require(dataFilePath);
    console.warn(`Using cached shop data`);
  } else {
    const vendure = new VendureServer(vendureShopApi, channelToken);
    shopData = await vendure.getShopData();
    console.log(`Fetched shop data`);
  }

  // TODO any mutations to shopData go here (like adding colors to Swatchable products)

  fs.writeFileSync(dataFilePath, JSON.stringify(shopData));
  shopData.products.forEach((product) =>
    routes.push(`/product/${product.slug}`)
  );
  return routes;
}
