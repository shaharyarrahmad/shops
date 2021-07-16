// This means we are in CloudRun
import winston, { format } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';
const useFormat = format.combine(
  format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  })(),
  format.json()
);

const loggingWinston = new LoggingWinston();
export const cloudLogger = winston.createLogger({
  format: useFormat,
  level: 'info',
  transports: [new winston.transports.Console(), loggingWinston],
});
