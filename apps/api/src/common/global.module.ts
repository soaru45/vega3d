import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './logger/logger.service';
import { CacheService } from '../modules/cache/cache.service';
import { QueueService } from '../modules/queue/queue.service';

@Global()
@Module({
  providers: [AppLoggerService, CacheService, QueueService],
  exports: [AppLoggerService, CacheService, QueueService],
})
export class GlobalModule {}
