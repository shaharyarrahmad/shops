import { LoggingBunyan } from '@google-cloud/logging-bunyan';
import bunyan from 'bunyan';
import { VendureLogger } from '@vendure/core';

export class CloudLogger implements VendureLogger {
  private log: bunyan;

  constructor() {
    const loggingBunyan = new LoggingBunyan();
    this.log = bunyan.createLogger({
      name: 'vendure22',
      streams: [loggingBunyan.stream('info')],
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
