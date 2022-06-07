import { VendureClient } from '../vendure/vendure.client';
import { Emitter } from 'mitt';
import { ProductFieldsFragment, ProductVariant } from '../generated/graphql';
import { CalculatedProduct, MinimalProduct } from '../vendure/types';

/**
 * Sets a .lowestPrice=1233 and .soldOut=true/false on the product
 */
export function setCalculatedFields<T extends MinimalProduct>(
  product: T
): CalculatedProduct<T> {
  const lowesPrice = Math.min(...product.variants.map((v) => v.priceWithTax));
  const available = product.variants.find((v) => !isOutOfStock(v));
  return {
    ...product,
    lowestPrice: lowesPrice,
    soldOut: !available,
  };
}

/**
 * Remove duplicate products from given list of products
 */
export function deduplicate(
  products: ProductFieldsFragment[]
): ProductFieldsFragment[] {
  const uniq: string[] = [];
  return products.filter((prod) => {
    if (uniq.indexOf(prod.slug) === -1) {
      uniq.push(prod.slug);
      return true;
    }
    return false;
  });
}

/**
 * Hydrate products on client side.
 * For now this only updates product.soldOut
 */
export async function hydrate<T extends MinimalProduct>(
  products: CalculatedProduct<T>[] | CalculatedProduct<T>,
  vendure: VendureClient
): Promise<void> {
  if (Array.isArray(products)) {
    const productIds = products.map((p) => p.id);
    const stockLevels = (await vendure.getStockForProducts(productIds)).map(
      (stockLevel) => setCalculatedFields(stockLevel)
    );
    products.forEach((p) => {
      const productWithStockLevel = stockLevels.find(
        (productWithStockLevel) => productWithStockLevel.id === p.id
      );
      if (productWithStockLevel) {
        p.soldOut = productWithStockLevel.soldOut;
      }
      return p;
    });
  }
  if (products) {
    // Single product
    const product = products as CalculatedProduct<T>;
    const hydratedProd = await vendure.getProduct(product.slug);
    product.soldOut = hydratedProd.soldOut;
  }
}

export function isOutOfStock(variant: { stockLevel: string }): boolean {
  return variant.stockLevel === 'OUT_OF_STOCK';
}

/**
 * Adds product to cart. Emitts error if something fails, never throws error
 */
export async function buy(
  variant: ProductVariant,
  ctx: { vendure: VendureClient; emitter: Emitter<any> },
  quantity = 1
): Promise<void> {
  try {
    await ctx.vendure.addProductToCart(variant.id, quantity);
    ctx.emitter.emit('productAdded', { variantId: variant.id, quantity });
  } catch (e) {
    console.error(e);
    ctx.emitter.emit('error', e);
  }
}
