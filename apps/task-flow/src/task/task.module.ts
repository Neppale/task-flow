import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { SendTaskToQueueService } from './services/send-task-to-queue.service';
import { ValidateTaskService } from './services/validate-task.service';
import { ValidateObjectService } from '../../../../utils/validate-object.service';
import { ConfigModule } from '../../../../utils/config/src/config.module';
import { QueueModule } from '../../../shared/queue/queue.module';
import { PrismaModule } from '../../../shared/prisma/prisma.module';
import { CreateTaskRepository } from 'apps/task-flow/src/task/repositories/create-task.repository';
import { CreateTaskService } from 'apps/task-flow/src/task/services/create-task.service';
import { GetTaskService } from 'apps/task-flow/src/task/services/get-task.service';
import { GetTasksService } from 'apps/task-flow/src/task/services/get-tasks.service';
import { UpdateTaskStatusService } from 'apps/task-flow/src/task/services/update-task-status.service';
import { UpdateTaskRepository } from 'apps/task-flow/src/task/repositories/update-task.repository';
import { ListTaskRepository } from 'apps/task-flow/src/task/repositories/list-task.repository';

@Module({
  imports: [ConfigModule, QueueModule, PrismaModule],
  controllers: [TaskController],
  providers: [
    SendTaskToQueueService,
    ValidateTaskService,
    ValidateObjectService,
    CreateTaskService,
    CreateTaskRepository,
    UpdateTaskStatusService,
    GetTaskService,
    GetTasksService,
    UpdateTaskStatusService,
    UpdateTaskRepository,
    ListTaskRepository,
  ],
})
export class TaskModule {}
