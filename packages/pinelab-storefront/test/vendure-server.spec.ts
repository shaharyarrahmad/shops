import { ShopData } from '../src';
import { VendureServer } from '../src';

describe('Get demo data from test-api', () => {

  const vendureServer = new VendureServer('https://test-api.pinelab.studio/shop-api', 'demo');
  let shopData: ShopData;

  beforeAll(async () => {
    shopData = await vendureServer.getShopData();
  })

  test('Has collections', async () => {
    const unflattenedCollections = vendureServer.unflatten(shopData.collections);
    expect(shopData.collections.length).toBe(3);
    expect(unflattenedCollections.length).toBe(3);
  });

  test('Has products', async () => {
    expect(shopData.products.length).toBe(6);
    expect(shopData.products[0].soldOut).toEqual(false);
    expect(typeof shopData.products[0].lowestPrice).toBe('number')
  });

  test('Has products per collection', async () => {
    expect(Array.isArray(shopData.productsPerCollection[0].products)).toBe(true);
    expect(shopData.productsPerCollection[0].collection.name).toBeDefined();
  });

  test('Has available countries', async () => {
    expect(Array.isArray(shopData.availableCountries)).toBe(true);
    expect(shopData.availableCountries.length).toBeGreaterThan(5)
  });
});
