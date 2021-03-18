require('dotenv').config({ path: process.env.SHOP_ENV });
import { bootstrap, JobQueueService, Logger } from '@vendure/core';
import localtunnel from 'localtunnel';

/**
 * Dev env settings
 */
(async () => {
  const tunnel = await localtunnel({ port: 3000 });
  // the assigned public url for your tunnel
  process.env.VENDURE_HOST = tunnel.url;
  Logger.info(`Localtunnel set up on ${tunnel.url}`);
  tunnel.on('close', () => {
    Logger.error(`'tunnel closed`);
  });

  const { config } = require('./vendure-config');
  bootstrap(config)
    .then(async (app) => {
      await app.get(JobQueueService).start();
      Logger.info(
        `\x1b[46mUsing database ${process.env.DATABASE_NAME} \x1b[0m`
      );
    })
    .catch((err) => {
      Logger.error(err);
    });
})();
