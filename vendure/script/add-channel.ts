require('dotenv').config({ path: process.env.LOCAL_ENV });
import { ChannelConfigService } from '../src/channel-config/channel-config.service';
import { bootstrap } from '@vendure/core';
import { config } from '../src/vendure-config';

(async () => {
  const app = await bootstrap(config);
  await app.get(ChannelConfigService).create({
    channelId: '4',
    channelName: 'LAB07',
    logoUrl: 'http://localhost:8080/logo.svg',
    supportEmail: 'martijn@pinelab.studio',
  });

  process.exit(0);
})();
