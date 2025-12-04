import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { RequestService } from './tasks/services/request.service';
import { BullMQWorkerService } from './tasks/bullmq-worker.service';
import { UpdateTaskRepository } from 'apps/task-flow/src/task/repositories/update-task.repository';

@Module({
  imports: [PrismaModule],
  controllers: [WorkerController],
  providers: [
    WorkerService,
    BullMQWorkerService,
    RequestService,
    UpdateTaskRepository,
  ],
})
export class WorkerModule {}
