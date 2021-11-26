require('dotenv').config({ path: process.env.LOCAL_ENV });
import {
  bootstrap,
  ChannelService,
  OrderService,
  RequestContext,
} from '@vendure/core';
import { config } from '../src/vendure-config';
import { MyparcelService } from 'vendure-plugin-myparcel/dist/myparcel.service';

// Use like yarn script:prod script/send-to-myparcel.ts bendeboef 6ENWC7GRJWYCAQXN
(async () => {
  const app = await bootstrap(config);
  const channelToken = process.argv[2];
  const orderCode = process.argv[3];
  const channel = app.get(ChannelService).getChannelFromToken(channelToken);
  const ctx = new RequestContext({
    apiType: 'admin',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });
  console.log(`Sending order ${orderCode} to MyParcel`);
  const order = await app.get(OrderService).findOneByCode(ctx, orderCode);
  if (!order) {
    throw Error('Order not found');
  }
  await app.get(MyparcelService).createShipments(channelToken, [order!]);
  console.log(`Sent ${order?.code}`);
  process.exit(0);
})();
