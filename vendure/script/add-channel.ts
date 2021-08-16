require('dotenv').config({ path: process.env.LOCAL_ENV });
import { ChannelConfigService } from '../src/channel-config/channel-config.service';
import { bootstrap } from '@vendure/core';
import { config } from '../src/vendure-config';

(async () => {
  const app = await bootstrap(config);
  await app.get(ChannelConfigService).create({
    channelId: '7',
    channelName: 'Super A',
    logoUrl: 'https://supera.netlify.app/img/logo.png',
    supportEmail: 'martijn@pinelab.studio',
  });

  process.exit(0);
})();
