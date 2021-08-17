import winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';
import {format } from 'winston';
const { combine, prettyPrint, errors } = format;

const loggingWinston = new LoggingWinston({
  logName: `winston_${process.env.SHOP_ENV}`,
});

export const cloudLogger = winston.createLogger({
  format: combine(
    errors({ stack: true }), 
    prettyPrint()
  ),
  level: 'info',
  transports: [loggingWinston],
});
