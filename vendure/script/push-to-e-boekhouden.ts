import { bootstrap } from '@vendure/core';
import { config } from '../src/vendure-config';
import { EBoekhoudenService } from 'vendure-plugin-e-boekhouden/dist/api/e-boekhouden.service';

(async () => {
  require('dotenv').config({ path: process.env.LOCAL_ENV });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);

  await app.get(EBoekhoudenService).pushOrder({
    channelToken: 'cantastic',
    orderCode: '1871SEE8F7DBMMDZ',
  });
})();
