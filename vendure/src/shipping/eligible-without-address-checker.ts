import { LanguageCode, ShippingEligibilityChecker } from '@vendure/core';

export const eligibleWithoutAddressChecker = new ShippingEligibilityChecker({
  code: 'eligible-without-address',
  description: [
    { languageCode: LanguageCode.en, value: 'Orders without address' },
  ],
  args: {},
  check: (ctx, order, args) => {
    return !!order.shippingAddress?.countryCode;
  },
});
