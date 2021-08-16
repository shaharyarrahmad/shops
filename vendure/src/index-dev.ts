require('dotenv').config({ path: process.env.LOCAL_ENV });
import { bootstrap, JobQueueService, Logger } from '@vendure/core';

/**
 * Dev env settings
 */
(async () => {
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
