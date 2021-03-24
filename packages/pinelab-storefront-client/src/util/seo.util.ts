/**
 * Removes all HTML tags from Vendure description and truncate to max 70 characters
 * @param str
 * @returns {string}
 */
import { CalculatedProduct } from '../vendure/calculated-product';

export function getSeoDescription(str: string) {
  if (!str) {
    return;
  }
  if (str.length > 70) {
    str = str.substring(0, 65) + '...';
  }
  str = str.replace(/<[^>]*>?/gm, ' '); // replace html
  str = str.replace(/&nbsp;/g, ' '); // replace &nbsp;
  return str.replace(/\s\s+/g, ' '); // repalce double spaces
}

export function getMetaInfo(product?: CalculatedProduct): MetaInfo | undefined {
  if (!product) {
    return;
  }
  const seoDescription = getSeoDescription(product.description);
  const image = product.featuredAsset
    ? product.featuredAsset.preview
    : undefined;
  return {
    title: product.name,
    meta: [
      { name: 'description', content: seoDescription },
      { name: 'og:title', content: product.name },
      { name: 'og:description', content: seoDescription },
      { name: 'og:image', content: image },
    ],
    script: [
      {
        type: 'application/ld+json',
        json: {
          '@context': 'http://schema.org',
          '@type': 'Product',
          name: product.name,
          image: image,
          description: seoDescription,
          offers: {
            '@type': 'Offer',
            price: product.lowesPrice / 100,
            priceCurrency: 'EUR',
          },
        },
      },
    ],
  };
}

export interface MetaInfo {
  title: string;
  meta: any[];
  script: any[];
}
