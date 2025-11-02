import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { SendTaskToQueueService } from './services/send-task-to-queue.service';
import { ConfigModule } from '../../../../libs/config/src/config.module';
import { QueueModule } from '../../../shared/queue/queue.module';
import { PrismaModule } from '../../../../libs/prisma/src/prisma.module';

@Module({
  imports: [ConfigModule, QueueModule, PrismaModule],
  controllers: [TaskController],
  providers: [SendTaskToQueueService],
})
export class TaskModule {}
