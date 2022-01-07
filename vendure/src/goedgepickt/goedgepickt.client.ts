import fetch from 'node-fetch';
import { Logger } from '@vendure/core';
import { Product, ProductInput } from './goedgepickt.types';

export interface GoedgepicktConfig {
  apiKey: string;
  webshopUuid: string;
}

interface RawRequestInput {
  entity: 'products' | 'orders';
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  payload?: Object;
}

export class GoedgepicktClient {
  private readonly headers: Record<string, string>;

  constructor(private readonly config: GoedgepicktConfig) {
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    };
  }

  async getProducts(): Promise<Product[]> {
    const result = await this.rawRequest({
      entity: 'products',
      method: 'GET',
    });
    return result.items as Product[];
  }

  async createProduct(product: ProductInput): Promise<Product[]> {
    const result = await this.rawRequest({
      entity: 'products',
      method: 'POST',
      payload: product,
    });
    return result.items as Product[];
  }

  async rawRequest(input: RawRequestInput): Promise<any> {
    const result = await fetch(
      `https://account.goedgepickt.nl/api/v1/${input.entity}`,
      {
        method: input.method,
        headers: this.headers,
        body:
          input.payload && input.method !== 'GET'
            ? JSON.stringify({
                webshopUuid: this.config.webshopUuid,
                ...input.payload,
              })
            : undefined,
        redirect: 'follow',
      }
    );
    const json = await result.json();
    if (json.error || json.errorMessage || json.message) {
      const errorMessage = json.error ?? json.errorMessage ?? json.message;
      throw Error(errorMessage);
    }
    return json;
  }
}
