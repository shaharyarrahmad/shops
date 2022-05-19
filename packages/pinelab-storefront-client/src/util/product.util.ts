import { VendureClient } from '../vendure/vendure.client';
import { Emitter } from 'mitt';
import { ProductVariant } from '../generated/graphql';

export interface CalculatedProduct {
  id: string;
  name?: string;
  description?: string;
  featuredAsset?: { preview: string; thumbnail: string };
  slug: string;
  lowestPrice: number;
  soldOut: boolean;
}

interface MinimalProduct {
  id: string;
  slug: string;
  variants: MinimalVariant[];
}

interface MinimalVariant {
  stockLevel: string;
  priceWithTax: number;
}

interface SlugHolder {
  slug: string;
}

/**
 * Set lowest price based on lowest price of variants and set soldout if all are sold out
 */
export function setCalculatedFields<T extends MinimalProduct>(
  product: T
): CalculatedProduct & T {
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
export function deduplicate<T extends SlugHolder>(products: T[]): T[] {
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
export async function hydrate<T extends CalculatedProduct>(
  products: T[] | T,
  vendure: VendureClient
): Promise<T[] | T | undefined> {
  if (Array.isArray(products)) {
    const updatedProducts = await vendure.getStockForProducts();
    return products.map((p) => {
      const hydratedProd = updatedProducts.find(
        (updatedProduct) => updatedProduct.id === p.id
      );
      if (hydratedProd) {
        p.soldOut = hydratedProd.soldOut;
      }
      return p;
    });
  }
  if (products) {
    const hydratedProd = await vendure.getProduct(products.slug);
    products.soldOut = hydratedProd.soldOut;
    return products;
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
  ctx: { vendure: VendureClient; emitter: Emitter },
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
