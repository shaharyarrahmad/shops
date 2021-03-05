require('dotenv').config();
import { bootstrap, Logger } from '@vendure/core';
import { config } from './vendure-config';

bootstrap(config)
  .then(() => {
    Logger.info(`\x1b[46mUsing database ${process.env.DATABASE_NAME} \x1b[0m`);
  })
  .catch((err) => {
    Logger.error(err);
  });
