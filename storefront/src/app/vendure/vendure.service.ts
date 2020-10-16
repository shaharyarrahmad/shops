import {GraphQLClient} from 'graphql-request';
import {
  activeOrderQuery,
  addItemToOrderMutation, addPaymentToOrderMutation,
  adjustOrderLineMutation,
  eligibleShippingMethodsQuery, nextOrderStatesQuery, orderByCodeQuery,
  productQuery,
  productsQuery,
  setCustomerForOrderMutation,
  setOrderShippingAddressMutation,
  setOrderShippingMethodMutation, transitionOrderToStateMutation
} from './graphql.queries';
import {environment} from '../../environments/environment';
import {Globals} from '../constants';
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {
  CreateAddressInput,
  CreateCustomerInput,
  ErrorResult,
  Order,
  PaymentInput,
  Product,
  ShippingMethodQuote
} from '../../generated/graphql';
import {ExtendedProduct} from './types/extended-product';

@Injectable({
  providedIn: 'root',
})
export class VendureService extends GraphQLClient {

  activeOrder$ = new ReplaySubject<Order>(1);

  constructor() {
    super(environment.vendureEndpoint, {headers: {'vendure-token': Globals.channelId}, credentials: 'include'});
    this.getActiveOrder().then(order => this.activeOrder$.next(order));
  }

  async getProducts(): Promise<ExtendedProduct[]> {
    const {products} = await this.request(productsQuery);
    return products?.items.map((p) => this.setLowestPrice(p));
  }

  async getProduct(id: string): Promise<ExtendedProduct> {
    const {product} = await this.request(productQuery, {id});
    return this.setLowestPrice(product);
  }

  async addProduct(productVariantId: string, quantity: number): Promise<Order> {
    let {addItemToOrder: order} = await this.request(addItemToOrderMutation, {productVariantId, quantity});
    this.validateResult(order);
    if (!order?.shippingMethod) {
      order = await this.setDefaultShipping();
    }
    this.activeOrder$.next(order);
    return order;
  }

  async getActiveOrder(): Promise<Order> {
    const {activeOrder} = await this.request(activeOrderQuery);
    this.activeOrder$.next(activeOrder);
    return activeOrder;
  }

  async getOrderByCode(code: string): Promise<Order> {
    const {orderByCode} = await this.request(orderByCodeQuery, {code});
    this.activeOrder$.next(orderByCode);
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

  async setDefaultShipping(): Promise<Order> {
    const methods = await this.getEligibleShippingMethods();
    const defaultMethod = methods.find(m => m.description?.indexOf('Normal') > -1 || m.description?.indexOf('Default') > -1);
    return this.setOrderShippingMethod(defaultMethod.id);
  }

  async transitionOrderToState(state: string): Promise<Order> {
    const {transitionOrderToState} = await this.request(transitionOrderToStateMutation, {state});
    this.validateResult(transitionOrderToState);
    this.activeOrder$.next(transitionOrderToState);
    return transitionOrderToState;
  }

  async addPaymentToOrder(input: PaymentInput): Promise<Order> {
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
