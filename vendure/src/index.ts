require('dotenv').config({ path: process.env.LOCAL_ENV });
import { bootstrap, JobQueueService, Logger } from '@vendure/core';

(async () => {
  if (process.env.LOCAL_ENV) {
    // Use localtunnel if we are local
    const tunnel = await require('localtunnel')({ port: 3050 });
    process.env.VENDURE_HOST = 'https://0872-85-145-210-58.ngrok.io/';
    console.warn(`Using localtunnel ${tunnel.url}`);
  }
  const { config } = require('./vendure-config');
  bootstrap(config)
    .then(async (app) => {
      await app.get(JobQueueService).start();
      Logger.info(`Using database ${process.env.DATABASE_NAME}`);
    })
    .catch((err) => {
      console.error(err);
    });
})();
