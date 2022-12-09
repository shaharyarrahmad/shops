import { GoedgepicktService } from 'vendure-plugin-goedgepickt/dist/vendure-plugin-goedgepickt/src/api/goedgepickt.service';
import {
  bootstrap,
  ChannelService,
  OrderService,
  RequestContext,
} from '@vendure/core';
import { EBoekhoudenService } from 'vendure-plugin-e-boekhouden/dist/api/e-boekhouden.service';

// Use like yarn script:prod script/send-to-goedgepickt.ts bendeboef 6ENWC7GRJWYCAQXN
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);
  const channelToken = process.argv[2];
  const orderCode = process.argv[3];
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  const ctx = new RequestContext({
    apiType: 'admin',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });
  await app.get(EBoekhoudenService).pushOrder({ orderCode, channelToken });
  console.log(`Sent order ${orderCode} to Eboekhouden`);
  process.exit(0);
})();
