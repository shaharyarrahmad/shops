require('dotenv').config({ path: process.env.LOCAL_ENV });
import {
  bootstrap,
  ChannelService,
  PaymentMethodService,
  RequestContext,
} from '@vendure/core';
import { config } from '../src/vendure-config';

// Update Mollie redirects to also include '/order' in the path
(async () => {
  const app = await bootstrap(config);
  const channel = await app.get(ChannelService).getDefaultChannel();
  const ctx = new RequestContext({
    apiType: 'admin',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });
  const { items: methods } = await app.get(PaymentMethodService).findAll(ctx);
  console.log();
  for (const method of methods) {
    const redirectUrl = method.handler.args.find(
      (arg) => arg.name === 'redirectUrl'
    );
    if (!redirectUrl) {
      console.error(`No redirectUrl found for ${method.name}`);
      process.exit(1);
    } else if (redirectUrl.value.endsWith('order')) {
      console.error(`${redirectUrl.value} Already ends with order`);
      process.exit(1);
    }
    const newValue = `${redirectUrl.value}order`;
    redirectUrl.value = newValue;
    await app.get(PaymentMethodService).update(ctx, {
      id: method.id,
      handler: {
        code: method.handler.code,
        arguments: method.handler.args,
      },
    });
    console.log(`Updated to ${newValue}`);
  }

  process.exit(0);
})();
