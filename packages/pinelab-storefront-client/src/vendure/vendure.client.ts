import { Store } from './store';
import { GraphQLClient } from 'graphql-request';
import {
  ADD_ITEM_TO_ORDER,
  ADJUST_ORDERLINE,
  APPLY_COUPON_CODE,
  CREATE_MOLLIE_PAYMENT_INTENT,
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
import { CalculatedProduct, setCalculatedFields } from '../util/product.util';
import {
  ActiveOrderQuery,
  AdditemToOrderMutation,
  AdditemToOrderMutationVariables,
  AdjustOrderLineMutation,
  AdjustOrderLineMutationVariables,
  ApplyCouponCodeMutation,
  ApplyCouponCodeMutationVariables,
  CreateAddressInput,
  CreateCustomerInput,
  CreateMolliePaymentIntentMutation,
  CreateMolliePaymentIntentMutationVariables,
  DutchAddressLookupQuery,
  DutchAddressLookupQueryVariables,
  DutchAddressLookupResult,
  DutchPostalCodeInput,
  EligibleShippingMethodsQuery,
  MolliePaymentIntent,
  NextOrderStatesQuery,
  Order,
  OrderByCodeQuery,
  OrderByCodeQueryVariables,
  OrderFieldsFragment,
  ProductQuery,
  ProductQueryVariables,
  ProductsQuery,
  RemoveCouponCodeMutation,
  RemoveCouponCodeMutationVariables,
  SetCustomerForOrderMutation,
  SetCustomerForOrderMutationVariables,
  SetOrderShippingAddressMutation,
  SetOrderShippingAddressMutationVariables,
  SetOrderShippingMethodMutation,
  SetOrderShippingMethodMutationVariables,
  TransitionOrderToStateMutation,
  TransitionOrderToStateMutationVariables,
} from '../generated/graphql';

export class VendureClient {
  client: GraphQLClient;
  tokenName = 'vendure-auth-token';

  constructor(private store: Store) {
    this.client = new GraphQLClient(process.env.GRIDSOME_VENDURE_API!, {
      headers: { 'vendure-token': process.env.GRIDSOME_VENDURE_TOKEN! },
    });
    this.getActiveOrder().then((order) => (this.store.activeOrder = order));
  }

  async getActiveOrder(): Promise<OrderFieldsFragment | undefined> {
    const { activeOrder } = await this.request<ActiveOrderQuery>(
      GET_ACTIVE_ORDER
    );
    this.store.activeOrder = activeOrder;
    return activeOrder;
  }

  /**
   * Get all products, but only ID, slug and variant price and stockLevel
   */
  async getStockForProducts(): Promise<CalculatedProduct[]> {
    const { products } = await this.request<ProductsQuery>(
      GET_PRICE_AND_STOCKLEVEL
    );
    return products.items.map((p) => setCalculatedFields(p));
  }

  async getProduct(
    slug: string
  ): Promise<CalculatedProduct & ProductQuery['product']> {
    const { product } = await this.request<ProductQuery, ProductQueryVariables>(
      GET_PRODUCT,
      { slug }
    );
    if (!product) {
      throw Error(`No product found for slug ${slug}`);
    }
    return setCalculatedFields(product);
  }

  async addProductToCart(
    productVariantId: string,
    quantity: number
  ): Promise<OrderFieldsFragment> {
    const { addItemToOrder } = await this.request<
      AdditemToOrderMutation,
      AdditemToOrderMutationVariables
    >(ADD_ITEM_TO_ORDER, {
      productVariantId,
      quantity,
    });
    this.validateResult(addItemToOrder);
    this.store.activeOrder = addItemToOrder as OrderFieldsFragment;
    await this.setLowestShippingMethod();
    return addItemToOrder as OrderFieldsFragment;
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

  async getEligibleShippingMethods(): Promise<
    EligibleShippingMethodsQuery['eligibleShippingMethods']
  > {
    const { eligibleShippingMethods } =
      await this.request<EligibleShippingMethodsQuery>(
        GET_ELIGIBLESHIPPINGMETHODS
      );
    return eligibleShippingMethods;
  }

  async setOrderShippingMethod(
    shippingMethodId: string
  ): Promise<OrderFieldsFragment> {
    const { setOrderShippingMethod } = await this.request<
      SetOrderShippingMethodMutation,
      SetOrderShippingMethodMutationVariables
    >(SET_ORDERSHIPPINGMETHOD, {
      shippingMethodId,
    });
    this.validateResult(setOrderShippingMethod);
    this.store.activeOrder = setOrderShippingMethod as OrderFieldsFragment;
    return setOrderShippingMethod as OrderFieldsFragment;
  }

  async adjustOrderLine(
    orderLineId: string,
    quantity: number
  ): Promise<OrderFieldsFragment> {
    const { adjustOrderLine } = await this.request<
      AdjustOrderLineMutation,
      AdjustOrderLineMutationVariables
    >(ADJUST_ORDERLINE, { orderLineId, quantity });
    this.validateResult(adjustOrderLine);
    this.store.activeOrder = adjustOrderLine as OrderFieldsFragment;
    return adjustOrderLine as OrderFieldsFragment;
  }

  async setCustomerForOrder(
    input: CreateCustomerInput
  ): Promise<OrderFieldsFragment> {
    const { setCustomerForOrder } = await this.request<
      SetCustomerForOrderMutation,
      SetCustomerForOrderMutationVariables
    >(SET_CUSTOMER_FOR_ORDER, { input });
    this.validateResult(setCustomerForOrder);
    this.store.activeOrder = setCustomerForOrder as OrderFieldsFragment;
    return setCustomerForOrder as OrderFieldsFragment;
  }

  async setOrderShippingAddress(
    input: CreateAddressInput
  ): Promise<OrderFieldsFragment> {
    const { setOrderShippingAddress: order } = await this.request<
      SetOrderShippingAddressMutation,
      SetOrderShippingAddressMutationVariables
    >(SET_ORDERSHIPPINGADDRESS, { input });
    this.store.activeOrder = order as OrderFieldsFragment;
    return order as OrderFieldsFragment;
  }

  async getNextOrderStates(): Promise<string[]> {
    const { nextOrderStates } = await this.request<NextOrderStatesQuery>(
      GET_NEXT_ORDERSTATES
    );
    return nextOrderStates;
  }

  async transitionOrderToState(state: string): Promise<OrderFieldsFragment> {
    const { transitionOrderToState } = await this.request<
      TransitionOrderToStateMutation,
      TransitionOrderToStateMutationVariables
    >(TRANSITION_ORDER_TO_STATE, { state });
    this.validateResult(transitionOrderToState);
    this.store.activeOrder = transitionOrderToState as OrderFieldsFragment;
    return transitionOrderToState as OrderFieldsFragment;
  }

  async createMolliePaymentIntent(code: string): Promise<string> {
    const { createMolliePaymentIntent } = await this.request<
      CreateMolliePaymentIntentMutation,
      CreateMolliePaymentIntentMutationVariables
    >(CREATE_MOLLIE_PAYMENT_INTENT, {
      input: { paymentMethodCode: code },
    });
    this.validateResult(createMolliePaymentIntent);
    return (createMolliePaymentIntent as MolliePaymentIntent).url;
  }

  async getOrderByCode(code: string): Promise<OrderFieldsFragment | undefined> {
    const { orderByCode } = await this.request<
      OrderByCodeQuery,
      OrderByCodeQueryVariables
    >(GET_ORDER_BY_CODE, { code });
    return orderByCode;
  }

  async getAddress(
    input: DutchPostalCodeInput
  ): Promise<DutchAddressLookupQuery['dutchAddressLookup'] | undefined> {
    const { dutchAddressLookup } = await this.request<
      DutchAddressLookupQuery,
      DutchAddressLookupQueryVariables
    >(GET_DUTCH_ADDRESS, {
      input,
    });
    return dutchAddressLookup;
  }

  async applyCouponCode(couponCode: string): Promise<OrderFieldsFragment> {
    const { applyCouponCode: order } = await this.request<
      ApplyCouponCodeMutation,
      ApplyCouponCodeMutationVariables
    >(APPLY_COUPON_CODE, {
      couponCode,
    });
    this.validateResult(order);
    this.store.activeOrder = order as OrderFieldsFragment;
    return order as OrderFieldsFragment;
  }

  async removeCouponCode(couponCode: string): Promise<OrderFieldsFragment> {
    const { removeCouponCode: order } = await this.request<
      RemoveCouponCodeMutation,
      RemoveCouponCodeMutationVariables
    >(REMOVE_COUPON_CODE, {
      couponCode,
    });
    this.store.activeOrder = order as OrderFieldsFragment;
    return order as OrderFieldsFragment;
  }

  validateResult(result: any): void {
    if (result && result.errorCode) {
      if (
        result.errorCode === 'ORDER_MODIFICATION_ERROR' ||
        result.errorCode === 'ORDER_PAYMENT_STATE_ERROR'
      ) {
        window.localStorage.removeItem(this.tokenName); // These are unrecoverable states, so remove activeOrder
      }
      throw Error(
        `${this.store.activeOrder?.code} - ${result.errorCode} - ${result.message}`
      );
    }
  }

  async request<T = void, I = void>(
    document: string,
    variables?: I
  ): Promise<T> {
    let token = window.localStorage.getItem(this.tokenName);
    if (token) {
      this.client.setHeader('Authorization', `Bearer ${token}`);
    }
    const { data, headers } = await this.client.rawRequest(document, variables);
    token = headers.get(this.tokenName);
    if (token) {
      window.localStorage.setItem(this.tokenName, token);
    }
    return data;
  }
}
