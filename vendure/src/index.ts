require('dotenv').config({ path: process.env.LOCAL_ENV });
import { bootstrap, JobQueueService, Logger } from '@vendure/core';
import { config } from './vendure-config';

bootstrap(config)
  .then(async (app) => {
    await app.get(JobQueueService).start();
    Logger.info(`Using database ${process.env.DATABASE_NAME}`, 'Bootstrap');
  })
  .catch((err) => {
    Logger.error(err, 'UNCAUGHT');
  });
