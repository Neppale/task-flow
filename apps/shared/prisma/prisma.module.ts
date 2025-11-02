import { Module, Global } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { EncryptionService } from './services/encryption.service';
import { CreateTaskRepository } from '../../task-flow/src/task/repositories/create-task.repository';
import { ListTaskRepository } from '../../task-flow/src/task/repositories/list-task.repository';
import { UpdateTaskRepository } from '../../task-flow/src/task/repositories/update-task.repository';
import { CreateTaskService } from '../../task-flow/src/task/services/create-task.service';
import { UpdateTaskStatusService } from '../../task-flow/src/task/services/update-task-status.service';
import { GetTaskService } from '../../task-flow/src/task/services/get-task.service';
import { GetTasksService } from '../../task-flow/src/task/services/get-tasks.service';

@Global()
@Module({
  providers: [
    PrismaService,
    EncryptionService,
    CreateTaskRepository,
    ListTaskRepository,
    UpdateTaskRepository,
    CreateTaskService,
    UpdateTaskStatusService,
    GetTaskService,
    GetTasksService,
  ],
  exports: [
    PrismaService,
    EncryptionService,
    CreateTaskService,
    UpdateTaskStatusService,
    GetTaskService,
    GetTasksService,
  ],
})
export class PrismaModule {}
