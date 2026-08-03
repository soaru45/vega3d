import { LoggerService, Injectable } from '@nestjs/common';
import { logger } from '@vega3d/logger';

@Injectable()
export class AppLoggerService implements LoggerService {
  log(message: any, context?: string) {
    logger.info({ context }, message);
  }
  error(message: any, trace?: string, context?: string) {
    logger.error({ trace, context }, message);
  }
  warn(message: any, context?: string) {
    logger.warn({ context }, message);
  }
  debug?(message: any, context?: string) {
    logger.debug({ context }, message);
  }
  verbose?(message: any, context?: string) {
    logger.trace({ context }, message);
  }
}
