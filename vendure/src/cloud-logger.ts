import { LoggingBunyan } from '@google-cloud/logging-bunyan';
import bunyan from 'bunyan';
import { VendureLogger } from '@vendure/core';

export class CloudLogger implements VendureLogger {
  private log;

  constructor() {
    const loggingBunyan = new LoggingBunyan();
    this.log = bunyan.createLogger({
      name: 'vendure',
      streams: [
        loggingBunyan.stream('info'),
        { stream: process.stdout, level: 'info' },
      ],
    });
  }

  error(message: string, context?: string, trace?: string): void {
    this.log.error(message, context, trace);
  }

  warn(message: string, context?: string): void {
    this.log.warn(message, context);
  }

  info(message: string, context?: string): void {
    this.log.info(message, context);
  }

  verbose(message: string, context?: string): void {
    this.log.debug(message, context);
  }

  debug(message: string, context?: string): void {
    this.log.debug(message, context);
  }
}
