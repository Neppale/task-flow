import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskRepository } from '../repositories/create-task.repository';
import { EncryptionService } from '../../../../shared/prisma/services/encryption.service';
import { TaskStatus, TaskType } from '@prisma/client';
import { ValidateTaskService } from './validate-task.service';

export interface CreateTaskParams {
  type: TaskType;
  data: Record<string, any>;
}

@Injectable()
export class CreateTaskService {
  private readonly logger = new Logger(CreateTaskService.name);

  constructor(
    private readonly validateTaskService: ValidateTaskService,
    private readonly createTaskRepository: CreateTaskRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(params: CreateTaskParams): Promise<{ id: string }> {
    const { type, data } = params;
    await this.validateTaskService.validate({ type, data });
    const encryptedData = this.encryptionService.encrypt(JSON.stringify(data));

    const task = await this.createTaskRepository.create({
      type,
      data: encryptedData,
      status: TaskStatus.PENDING,
    });

    this.logger.log(`Task ${task.id} created with type ${type}`);
    return { id: task.id };
  }
}
