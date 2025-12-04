import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskRepository } from '../repositories/create-task.repository';
import { EncryptionService } from '../../../../shared/prisma/services/encryption.service';
import { TaskStatus, TaskType, Task } from '@prisma/client';
import { ValidateTaskService } from './validate-task.service';

export interface CreateTaskParams {
  type: TaskType;
  data: Record<string, any>;
  cron?: string;
  retries?: number;
  date?: Date;
}

@Injectable()
export class CreateTaskService {
  private readonly logger = new Logger(CreateTaskService.name);

  constructor(
    private readonly validateTaskService: ValidateTaskService,
    private readonly createTaskRepository: CreateTaskRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(params: CreateTaskParams): Promise<Task> {
    await this.validateTaskService.validate(params);
    const encryptedData = this.encryptionService.encrypt(
      JSON.stringify(params.data),
    );

    const task = await this.createTaskRepository.create({
      type: params.type,
      data: encryptedData,
      status: TaskStatus.PENDING,
      cron: params.cron,
      date: params.date,
      retries: params.retries,
    });

    this.logger.log(`Task ${task.id} created with type ${params.type}`);
    return task;
  }
}
