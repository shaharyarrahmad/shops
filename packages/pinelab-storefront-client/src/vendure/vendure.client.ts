import { Store } from './store';
import { GraphQLClient } from 'graphql-request';
import {
  ADD_ITEM_TO_ORDER,
  ADD_PAYMENT_TO_ORDER,
  ADJUST_ORDERLINE,
  APPLY_COUPON_CODE,
  GET_ACTIVE_ORDER,
  GET_DUTCH_ADDRESS,
  GET_ELIGIBLESHIPPINGMETHODS,
  GET_NEXT_ORDERSTATES,
  GET_ORDER_BY_CODE,
  GET_PRICE_AND_STOCKLEVEL,
  GET_PRODUCT,
  REMOVE_COUPON_CODE,
  SET_CUSTOMER_FOR_ORDER,
  SET_ORDERSHIPPINGADDRESS,
  SET_ORDERSHIPPINGMETHOD,
  TRANSITION_ORDER_TO_STATE,
} from './vendure.queries';
import {
  CreateAddressInput,
  CreateCustomerInput,
  DutchAddressLookupResult,
  DutchPostalCodeInput,
  ErrorResult,
  Order,
  PaymentInput,
  Product,
  ShippingMethodQuote,
} from '../../../common';
import { CalculatedProduct } from './calculated-product';
import { setCalculatedFields } from '../util/product.util';

export class VendureClient {
  client: GraphQLClient;

  constructor(private store: Store) {
    this.client = new GraphQLClient(process.env.GRIDSOME_VENDURE_API!, {
      headers: { 'vendure-token': process.env.GRIDSOME_VENDURE_TOKEN! },
    });
    this.getActiveOrder().then((order) => (this.store.activeOrder = order));
  }

  async getActiveOrder(): Promise<Order> {
    const { activeOrder } = await this.request(GET_ACTIVE_ORDER);
    this.store.activeOrder = activeOrder;
    return activeOrder;
  }

  /**
   * Get all products, but only ID, slug and variant price and stockLevel
   */
  async getStockForProducts(): Promise<CalculatedProduct[]> {
    const { products } = await this.request(GET_PRICE_AND_STOCKLEVEL);
    return products.items.map((p: Product) => setCalculatedFields(p));
  }

  async getProduct(slug: string): Promise<CalculatedProduct> {
    const { product } = await this.request(GET_PRODUCT, { slug });
    return setCalculatedFields(product);
  }

  async addProductToCart(
    productVariantId: string,
    quantity: number
  ): Promise<Order> {
    const { addItemToOrder: order } = await this.request(ADD_ITEM_TO_ORDER, {
      productVariantId,
      quantity,
    });
    this.validateResult(order);
    this.store.activeOrder = order;
    await this.setLowestShippingMethod();
    return order;
  }

  async setLowestShippingMethod() {
    const methods = await this.getEligibleShippingMethods();
    const [defaultMethod] = methods.sort(
      (a, b) => a.priceWithTax - b.priceWithTax
    );
    if (defaultMethod) {
      await this.setOrderShippingMethod(defaultMethod.id);
    } else {
      console.error(`No default shipping found`);
    }
  }

  async getEligibleShippingMethods(): Promise<ShippingMethodQuote[]> {
    const { eligibleShippingMethods } = await this.request(
      GET_ELIGIBLESHIPPINGMETHODS
    );
    return eligibleShippingMethods;
  }

  async setOrderShippingMethod(shippingMethodId: string): Promise<Order> {
    const { setOrderShippingMethod } = await this.request(
      SET_ORDERSHIPPINGMETHOD,
      {
        shippingMethodId,
      }
    );
    this.validateResult(setOrderShippingMethod);
    this.store.activeOrder = setOrderShippingMethod;
    return setOrderShippingMethod;
  }

  async adjustOrderLine(orderLineId: string, quantity: number): Promise<Order> {
    const {
      adjustOrderLine: activeOrder,
    } = await this.request(ADJUST_ORDERLINE, { orderLineId, quantity });
    this.validateResult(activeOrder);
    this.store.activeOrder = activeOrder;
    return activeOrder;
  }

  async setCustomerForOrder(input: CreateCustomerInput): Promise<Order> {
    const {
      setCustomerForOrder: order,
    } = await this.request(SET_CUSTOMER_FOR_ORDER, { input });
    this.validateResult(order);
    this.store.activeOrder = order;
    return order;
  }

  async setOrderShippingAddress(input: CreateAddressInput): Promise<Order> {
    /*    if (!input.company || input.company.length === 0) {
      input.company = '-'; // Dirty fix
    }
    if (!input.phoneNumber || input.phoneNumber.length === 0) {
      input.phoneNumber = '-'; // Dirty fix
    }*/
    const {
      setOrderShippingAddress: order,
    } = await this.request(SET_ORDERSHIPPINGADDRESS, { input });
    this.store.activeOrder = order;
    return order;
  }

  async getNextOrderStates(): Promise<string[]> {
    const { nextOrderStates } = await this.request(GET_NEXT_ORDERSTATES);
    return nextOrderStates;
  }

  async transitionOrderToState(state: string): Promise<Order> {
    const {
      transitionOrderToState,
    } = await this.request(TRANSITION_ORDER_TO_STATE, { state });
    this.validateResult(transitionOrderToState);
    this.store.activeOrder = transitionOrderToState;
    return transitionOrderToState;
  }

  async addPaymentToOrder(input: PaymentInput): Promise<Order> {
    const { addPaymentToOrder } = await this.request(ADD_PAYMENT_TO_ORDER, {
      input,
    });
    this.validateResult(addPaymentToOrder);
    this.store.activeOrder = addPaymentToOrder;
    return addPaymentToOrder;
  }

  async getOrderByCode(code: string): Promise<Order | undefined> {
    const { orderByCode } = await this.request(GET_ORDER_BY_CODE, { code });
    return orderByCode;
  }

  async getAddress(
    input: DutchPostalCodeInput
  ): Promise<DutchAddressLookupResult | undefined> {
    const { dutchAddressLookup } = await this.request(GET_DUTCH_ADDRESS, {
      input,
    });
    return dutchAddressLookup;
  }

  async applyCouponCode(couponCode: string): Promise<Order> {
    const { applyCouponCode: order } = await this.request(APPLY_COUPON_CODE, {
      couponCode,
    });
    this.validateResult(order);
    this.store.activeOrder = order;
    return order;
  }

  async removeCouponCode(couponCode: string): Promise<Order> {
    const { removeCouponCode: order } = await this.request(REMOVE_COUPON_CODE, {
      couponCode,
    });
    this.store.activeOrder = order;
    return order;
  }

  validateResult<T extends ErrorResult>(result: T): void {
    if (result && result.errorCode) {
      throw Error(
        `${this.store.activeOrder?.code} - ${result.errorCode} - ${result.message}`
      );
    }
  }

  async request(document: string, variables?: any): Promise<any> {
    const tokenName = 'vendure-auth-token';
    let token = window.localStorage.getItem(tokenName);
    if (token) {
      this.client.setHeader('Authorization', `Bearer ${token}`);
    }
    const { data, headers, errors } = await this.client.rawRequest(
      document,
      variables
    );
    if (errors) {
      throw errors;
    }
    token = headers.get(tokenName);
    if (token) {
      window.localStorage.setItem(tokenName, token);
    }
    return data;
  }
}
