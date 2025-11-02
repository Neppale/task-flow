import { Module } from '@nestjs/common';
import { LoggerService } from './logger/services/logger.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class ConfigModule {}
