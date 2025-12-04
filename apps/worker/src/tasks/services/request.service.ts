/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { TaskStatus, type Task } from '@prisma/client';
import { EncryptionService } from 'apps/shared/prisma/services/encryption.service';
import { UpdateTaskRepository } from 'apps/task-flow/src/task/repositories/update-task.repository';
import axios from 'axios';

@Injectable()
export class RequestService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly updateTaskRepository: UpdateTaskRepository,
  ) {}

  async execute(task: Task): Promise<void> {
    await this.updateTaskRepository.updateStatus(task.id, TaskStatus.RUNNING);
    try {
      const descryptedData = this.encryptionService.decrypt(task.data);
      const { url, method, headers, body } = JSON.parse(descryptedData);
      await axios.request({
        url,
        method,
        headers,
        data: body,
      });
      await this.updateTaskRepository.updateStatus(
        task.id,
        TaskStatus.COMPLETED,
      );
    } catch (error) {
      await this.updateTaskRepository.updateStatus(task.id, TaskStatus.FAILED);
      throw new Error('Failed to execute task', { cause: error });
    }
  }
}
