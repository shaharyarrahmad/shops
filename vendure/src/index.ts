require('dotenv').config({ path: process.env.LOCAL_ENV });
import { bootstrap, bootstrapWorker, Logger } from '@vendure/core';
import { config, runningInWorker } from './vendure-config';

if (runningInWorker) {
  bootstrapWorker(config)
    .then(() => {
      Logger.info(`Bootstrapped worker for env ${process.env.SHOP_ENV}`);
    })
    .catch((err) => {
      console.error(err);
    });
} else {
  bootstrap(config)
    .then(() => {
      Logger.info(`Bootstrapped Vendure for env ${process.env.SHOP_ENV}`);
    })
    .catch((err) => {
      console.error(err);
    });
}
