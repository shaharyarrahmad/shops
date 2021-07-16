import winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const loggingWinston = new LoggingWinston({
  logName: `winston_${process.env.SHOP_ENV}`,
});

export const cloudLogger = winston.createLogger({
  level: 'info',
  transports: [loggingWinston],
});
