require('dotenv').config({ path: process.env.LOCAL_ENV });
import { config } from '../src/vendure-config';
import { bootstrap } from '@vendure/core';
import { GoedgepicktService } from '../src/goedgepickt/goedgepickt.service';

(async () => {
  const app = await bootstrap(config);
  await app.get(GoedgepicktService).pushProducts('demo');

  process.exit(0);
})();
