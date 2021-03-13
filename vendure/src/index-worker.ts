import { bootstrapWorker, Logger } from '@vendure/core';
import { config } from './vendure-config';

bootstrapWorker(config).catch((err) => {
  Logger.info(err);
});
