/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { ListTaskRepository } from '../repositories/list-task.repository';
import { EncryptionService } from '../../../../shared/prisma/services/encryption.service';
import { TaskStatus } from '@prisma/client';

export interface TaskWithDecryptedData {
  id: string;
  type: string;
  data: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class GetTaskService {
  constructor(
    private readonly listTaskRepository: ListTaskRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async get(id: string): Promise<TaskWithDecryptedData | null> {
    const task = await this.listTaskRepository.findById(id);

    if (!task) {
      return null;
    }

    const decryptedData = this.encryptionService.decrypt(task.data);
    return {
      id: task.id,
      type: task.type,
      data: decryptedData,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
