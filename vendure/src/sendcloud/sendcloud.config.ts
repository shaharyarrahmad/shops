import {
  getCouponCodes,
  getNrOfOrders,
  ParcelInputItem,
  SendcloudPluginOptions,
} from 'vendure-plugin-sendcloud';

export const sendcloudConfig: SendcloudPluginOptions = {
  weightFn: (line) =>
    (line.productVariant.product?.customFields as any)?.weight,
  hsCodeFn: (line) =>
    (line.productVariant.product?.customFields as any)?.hsCode,
  originCountryFn: (line) => 'NL',
  additionalParcelItemsFn: async (ctx, injector, order) => {
    const additionalInputs: ParcelInputItem[] = [];
    // Add nr of orders from customer
    additionalInputs.push(await getNrOfOrders(ctx, injector, order));
    // Add couponcodes
    const couponCodes = getCouponCodes(order);
    if (couponCodes) {
      additionalInputs.push(couponCodes);
    }
    // Add customer note
    if ((order.customFields as any).customerNote) {
      additionalInputs.push({
        description: (order.customFields as any).customerNote,
        quantity: 1,
        weight: '0.1',
        sku: 'Customer note',
        value: '0',
      });
    }
    return additionalInputs;
  },
};
