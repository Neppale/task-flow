import { Module, Global } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { EncryptionService } from './services/encryption.service';
import { CreateTaskRepository } from '../../task-flow/src/job/repositories/create-task.repository';
import { ListTaskRepository } from '../../task-flow/src/job/repositories/list-task.repository';
import { UpdateTaskRepository } from '../../task-flow/src/job/repositories/update-task.repository';
import { CreateTaskService } from '../../task-flow/src/job/services/create-task.service';
import { UpdateTaskStatusService } from '../../task-flow/src/job/services/update-task-status.service';
import { GetTaskService } from '../../task-flow/src/job/services/get-task.service';
import { GetTasksService } from '../../task-flow/src/job/services/get-tasks.service';

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
