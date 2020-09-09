export interface Asset {
  preview: string;
}

export interface Variant {
  id: string;
  name: string;
  priceWithTax: number;
  productId: string;
}

export interface Product {
  id: string;
  name: string;
  lowestPriceIncVAT: number;
  assets: Asset[];
  description: string;
  variants: Variant[];
}
