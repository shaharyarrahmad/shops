require('dotenv').config({ path: process.env.LOCAL_ENV });
import { bootstrap, JobQueueService, Logger } from '@vendure/core';
import { config, runningInWorker, runningLocal } from './vendure-config';
import { json } from 'body-parser';

bootstrap(config)
  .then(async (app) => {
    if (runningInWorker || runningLocal) {
      // Start worker if running in worker or running locally
      Logger.info(`Started JobQueueService ${process.env.SHOP_ENV}`);
      await app.get(JobQueueService).start();
    }
    // TODO check if this solves the "entity too large" error
    app.use(json({ limit: '1mb' }));
    Logger.info(`Bootstrapped Vendure for env ${process.env.SHOP_ENV}`);
  })
  .catch((err) => {
    console.error(err);
  });
