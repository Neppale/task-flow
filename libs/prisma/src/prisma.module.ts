import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EncryptionService } from './encryption.service';
import { CreateTaskRepository } from './repositories/create-task.repository';
import { ListTaskRepository } from './repositories/list-task.repository';
import { UpdateTaskRepository } from './repositories/update-task.repository';
import { CreateTaskService } from './services/create-task.service';
import { UpdateTaskStatusService } from './services/update-task-status.service';
import { GetTaskService } from './services/get-task.service';
import { GetTasksService } from './services/get-tasks.service';

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
