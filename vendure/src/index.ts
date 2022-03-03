require('dotenv').config({ path: process.env.LOCAL_ENV });
import { bootstrap, JobQueueService, Logger } from '@vendure/core';
import { config, runningInWorker } from './vendure-config';

bootstrap(config)
  .then(async (app) => {
    if (runningInWorker) {
      Logger.info(`Started JobQueueService ${process.env.SHOP_ENV}`);
      await app.get(JobQueueService).start();
    }
    Logger.info(`Bootstrapped Vendure for env ${process.env.SHOP_ENV}`);
  })
  .catch((err) => {
    console.error(err);
  });
