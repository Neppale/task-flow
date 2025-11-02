/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskRepository } from '../repositories/create-task.repository';
import { EncryptionService } from '../../../../shared/prisma/services/encryption.service';
import { TaskStatus, TaskType } from '@prisma/client';
import { ValidateTaskService } from './validate-task.service';

export interface CreateTaskParams {
  type: TaskType;
  data: Record<string, any>;
  status?: TaskStatus;
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
    const { type, data, status = TaskStatus.PENDING } = params;
    await this.validateTaskService.validate({ type, data });
    const encryptedData = this.encryptionService.encrypt(JSON.stringify(data));

    const task = await this.createTaskRepository.create({
      type,
      data: encryptedData,
      status,
    });

    this.logger.log(`Task ${task.id} created with type ${type}`);
    return { id: task.id };
  }
}
