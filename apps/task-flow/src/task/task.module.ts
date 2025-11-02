import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { SendTaskToQueueService } from './services/send-task-to-queue.service';
import { ValidateTaskService } from './services/validate-task.service';
import { ValidateObjectService } from '../../../../utils/validate-object.service';
import { ConfigModule } from '../../../../utils/config/src/config.module';
import { QueueModule } from '../../../shared/queue/queue.module';
import { PrismaModule } from '../../../shared/prisma/prisma.module';

@Module({
  imports: [ConfigModule, QueueModule, PrismaModule],
  controllers: [TaskController],
  providers: [
    SendTaskToQueueService,
    ValidateTaskService,
    ValidateObjectService,
  ],
})
export class TaskModule {}
