import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { SendTaskToQueueService } from './services/send-job-to-queue.service';
import { ConfigModule } from '../../../../libs/config/src/config.module';
import { QueueModule } from '../../../shared/queue/queue.module';

@Module({
  imports: [ConfigModule, QueueModule],
  controllers: [TaskController],
  providers: [SendTaskToQueueService],
})
export class TaskModule {}
