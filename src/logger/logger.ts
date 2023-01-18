import { DatLogger } from '@dat/logger';
import { merge, errorToMetadata } from './logger.helper';

export class Logger {
  constructor(private readonly defaultMetadata: object = {}) {}

  public verbose(message: string, metadata: object = {}): void {
    DatLogger.verbose(message, merge(this.defaultMetadata, metadata));
  }

  public debug(message: string, metadata: object = {}): void {
    DatLogger.debug(message, merge(this.defaultMetadata, metadata));
  }

  public info(message: string, metadata: object = {}): void {
    DatLogger.info(message, merge(this.defaultMetadata, metadata));
  }

  public warn(message: string, metadata: object = {}): void {
    DatLogger.warn(message, merge(this.defaultMetadata, metadata));
  }

  public error(message: string, error: Error = null, metadata: object = {}): void {
    DatLogger.error(message, merge(this.defaultMetadata, metadata, errorToMetadata(error)));
  }
}
