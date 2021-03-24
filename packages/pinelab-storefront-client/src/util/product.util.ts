import { Product } from '../../../common';
import { CalculatedProduct } from '../vendure/calculated-product';

/**
 * Set lowest price based on lowest price of variants and set soldout if all are sold out
 */
export function setCalculatedFields(product: Product): CalculatedProduct {
  const lowesPrice = Math.min(...product.variants.map((v) => v.priceWithTax));
  const available = product.variants.find(
    (v) => v.stockLevel !== 'OUT_OF_STOCK'
  );
  return {
    ...product,
    lowesPrice,
    soldOut: !available,
  };
}

/**
 * Remove duplicate products from given list of products
 */
export function deduplicate(products: Product[]): Product[] {
  const uniq: string[] = [];
  return products.filter((prod) => {
    if (uniq.indexOf(prod.slug) === -1) {
      uniq.push(prod.slug);
      return true;
    }
    return false;
  });
}
