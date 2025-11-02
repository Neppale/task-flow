/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskRepository } from '../repositories/create-task.repository';
import { EncryptionService } from '../../../../shared/prisma/services/encryption.service';
import { TaskStatus, TaskType } from '@prisma/client';

export interface CreateTaskInput {
  type: TaskType;
  data: Record<string, any>;
  status?: TaskStatus;
}

@Injectable()
export class CreateTaskService {
  private readonly logger = new Logger(CreateTaskService.name);

  constructor(
    private readonly createTaskRepository: CreateTaskRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async create(input: CreateTaskInput): Promise<{ id: string }> {
    const { type, data, status = TaskStatus.PENDING } = input;
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
