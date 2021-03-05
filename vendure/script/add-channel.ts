require('dotenv').config({ path: process.env.SHOP_ENV });
import { ChannelConfigService } from '../src/channel-config/channel-config.service';
import { bootstrap } from '@vendure/core';
import { config } from '../src/vendure-config';

(async () => {
  const app = await bootstrap(config);
  await app.get(ChannelConfigService).create({
    channelId: '3',
    channelName: 'de Pinelab Demo Shop',
    logoUrl: 'https://pinelab-gridsome.netlify.app/logo.png',
    supportEmail: 'martijn@pinelab.studio',
  });

  process.exit(0);
})();
