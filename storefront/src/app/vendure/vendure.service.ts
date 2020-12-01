import {GraphQLClient} from 'graphql-request';
import {
  activeOrderQuery,
  addItemToOrderMutation,
  addPaymentToOrderMutation,
  adjustOrderLineMutation,
  collectionQuery,
  collectionsQuery,
  eligibleShippingMethodsQuery,
  nextOrderStatesQuery,
  orderByCodeQuery,
  productQuery,
  productsQuery,
  setCustomerForOrderMutation,
  setOrderShippingAddressMutation,
  setOrderShippingMethodMutation,
  transitionOrderToStateMutation
} from './graphql.queries';
import {environment} from '../../environments/environment';
import {Globals} from '../constants';
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {
  Collection,
  CreateAddressInput,
  CreateCustomerInput,
  ErrorResult,
  Order,
  PaymentInput,
  Product,
  ProductVariant,
  ShippingMethodQuote
} from '../../generated/graphql';
import {ExtendedProduct} from './types/extended-product';
import {Variables} from 'graphql-request/dist/types';

@Injectable({
  providedIn: 'root',
})
export class VendureService {

  static tokenName = 'vendure-auth-token';
  client: GraphQLClient;
  activeOrder$ = new ReplaySubject<Order>(1);

  constructor() {
    this.client = new GraphQLClient(environment.vendureEndpoint, {
      headers: {'vendure-token': Globals.channelId},
    });
    this.getActiveOrder().then(order => this.activeOrder$.next(order));
  }

  async getProducts(): Promise<ExtendedProduct[]> {
    const {products} = await this.request(productsQuery);
    return products?.items.map((p) => this.setLowestPrice(p));
  }

  async getProduct(slug: string): Promise<ExtendedProduct> {
    const {product} = await this.request(productQuery, {slug});
    return this.setLowestPrice(product);
  }

  async addProduct(productVariantId: string, quantity: number): Promise<Order> {
    const {addItemToOrder: order} = await this.request(addItemToOrderMutation, {productVariantId, quantity});
    this.validateResult(order);
    this.activeOrder$.next(order);
    await this.setLowestShippingMethod();
    return order;
  }

  async getActiveOrder(): Promise<Order> {
    const {activeOrder} = await this.request(activeOrderQuery);
    this.activeOrder$.next(activeOrder);
    return activeOrder;
  }

  async getOrderByCode(code: string): Promise<Order> {
    const {orderByCode} = await this.request(orderByCodeQuery, {code});
    // this.activeOrder$.next(orderByCode); Don't push to active order, becaus it aint active
    return orderByCode;
  }

  async adjustOrderLine(orderLineId: string, quantity: number): Promise<Order> {
    const {adjustOrderLine} = await this.request(adjustOrderLineMutation, {orderLineId, quantity});
    this.validateResult(adjustOrderLine);
    this.activeOrder$.next(adjustOrderLine);
    return adjustOrderLine;
  }

  async setCustomerForOrder(input: CreateCustomerInput): Promise<Order> {
    const {setCustomerForOrder} = await this.request(setCustomerForOrderMutation, {input});
    this.validateResult(setCustomerForOrder);
    this.activeOrder$.next(setCustomerForOrder);
    return setCustomerForOrder;
  }

  async setOrderShippingAddress(input: CreateAddressInput): Promise<Order> {
    const {setOrderShippingAddress} = await this.request(setOrderShippingAddressMutation, {input});
    this.activeOrder$.next(setOrderShippingAddress);
    return setOrderShippingAddress;
  }

  async getEligibleShippingMethods(): Promise<ShippingMethodQuote[]> {
    const {eligibleShippingMethods} = await this.request(eligibleShippingMethodsQuery);
    return eligibleShippingMethods;
  }

  async setOrderShippingMethod(shippingMethodId: string): Promise<Order> {
    const {setOrderShippingMethod} = await this.request(setOrderShippingMethodMutation, {shippingMethodId});
    this.validateResult(setOrderShippingMethod);
    this.activeOrder$.next(setOrderShippingMethod);
    return setOrderShippingMethod;
  }

  /**
   * Find and set lowest shipping method for this order
   */
  async setLowestShippingMethod(): Promise<void> {
    const methods = await this.getEligibleShippingMethods();
    const [defaultMethod] = methods
      // .filter(m => m.priceWithTax !== 0)
      .sort((a, b) => a.priceWithTax - b.priceWithTax);
    if (defaultMethod) {
      await this.setOrderShippingMethod(defaultMethod.id);
    } else {
      console.error(`No default shipping found`);
    }
  }

  async transitionOrderToState(state: string): Promise<Order> {
    const {transitionOrderToState} = await this.request(transitionOrderToStateMutation, {state});
    this.validateResult(transitionOrderToState);
    this.activeOrder$.next(transitionOrderToState);
    return transitionOrderToState;
  }

  async addPaymentToOrder(input: PaymentInput): Promise<Order | ErrorResult> {
    input.metadata.channel = Globals.channelId;
    const {addPaymentToOrder} = await this.request(addPaymentToOrderMutation, {input});
    this.validateResult(addPaymentToOrder);
    this.activeOrder$.next(addPaymentToOrder);
    return addPaymentToOrder;
  }

  async getNextOrderStates(): Promise<string> {
    const {nextOrderStates} = await this.request(nextOrderStatesQuery);
    return nextOrderStates;
  }

  async getCollections(): Promise<Collection[]> {
    const {collections: {items}} = await this.request(collectionsQuery);
    return items;
  }

  /**
   * Gets description and products for given Collection
   */
  async getProductsForCollection(slug: string): Promise<[ExtendedProduct[], Collection]> {
    const {collection}: { collection: Collection } = await this.request(collectionQuery, {slug});
    const products = collection?.productVariants?.items?.map(variant => (variant as ProductVariant).product);
    const deduplicated = this.deduplicate(products?.map(p => this.setLowestPrice(p)) || []);
    return [deduplicated, collection];
  }

  async request<T = any, V = Variables>(document: string, variables?: V): Promise<T> {
    let token = window.localStorage.getItem(VendureService.tokenName);
    if (token) {
      this.client.setHeader('Authorization', `Bearer ${token}`);
    }
    const {data, headers, errors} = await this.client.rawRequest(document, variables);
    if (errors) {
      throw errors;
    }
    token = headers.get(VendureService.tokenName);
    if (token) {
      window.localStorage.setItem(VendureService.tokenName, token);
    }
    return data;
  }

  deduplicate(products: ExtendedProduct[]): ExtendedProduct[] {
    const uniq = [];
    return products.filter((prod) => {
      if (uniq.indexOf(prod.slug) === -1) {
        uniq.push(prod.slug);
        return true;
      }
      return false;
    });
  }

  /**
   * Set lowest price based on lowest price of variants
   */
  private setLowestPrice(product: Product): ExtendedProduct {
    const defaultPrice = Math.min(...product.variants.map(v => v.priceWithTax));
    return {
      ...product,
      defaultPrice
    };
  }

  /**
   * Throws the error if one exists in result
   */
  private validateResult(order: Order | ErrorResult): void {
    if ((order as ErrorResult).errorCode) {
      throw Error((order as ErrorResult).message);
    }
  }

}
