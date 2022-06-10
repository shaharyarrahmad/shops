import { SortableCollection, VendureServer } from 'pinelab-storefront';

export interface PreparedData {
  routes: string[];
  global: GlobalSiteData;
}

export interface GlobalSiteData {
  collections: SortableCollection[];
  instagram: string;
  facebook: string;
  usps: string[];
}

/**
 * Downloads all products, collections etc from Vendure
 * And optionally mutate/prepare the data here
 */
export async function prepareData(
  vendureShopApi,
  channelToken
): Promise<PreparedData> {
  const vendure = new VendureServer(vendureShopApi, channelToken);
  const {
    collections: allCollections,
    availableCountries,
    productsPerCollection,
    products,
  } = await vendure.getShopData();
  console.log(`Fetched shop data`);

  // ---------------------- Global data
  const collections = vendure.unflatten(allCollections);
  const global = {
    collections,
    instagram: 'https://www.instagram.com/cantastic.nl/',
    facebook: 'https://www.facebook.com/cantastic.nl/',
    usps: [
      '<p>Vanaf €75 <b>gratis</b> verzending</p>',
      '<p><b>Achteraf</b> betalen</p>',
      '<p><b>Exclusieve</b> producten</p>',
      '<p>Ook wel eens <b>gearresteerd</b></p>',
    ],
  };
  const routes: string[] = [];
  routes.push(...products.map((p) => `/product/${p.slug}`));
  console.log('Prepared shop data');
  return {
    /*    collections,
    availableCountries,
    productsPerCollection,
    products,*/
    global,
    routes,
  };
}
