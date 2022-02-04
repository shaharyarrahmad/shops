import {
  bootstrap,
  ChannelService,
  ProductVariantService,
  RequestContext,
} from '@vendure/core';
import { config } from '../src/vendure-config';

require('dotenv').config({ path: process.env.LOCAL_ENV });

(async () => {
  const app = await bootstrap(config);

  const channel = await app.get(ChannelService).getChannelFromToken('demo');
  const ctx = new RequestContext({
    apiType: 'shop',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });
  const { items: variants } = await app.get(ProductVariantService).findAll(ctx);
  process.exit(0);
})();
