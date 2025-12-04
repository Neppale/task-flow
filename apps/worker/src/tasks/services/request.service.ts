/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { TaskStatus, type Task } from '@prisma/client';
import { EncryptionService } from '../../../../shared/prisma/services/encryption.service';
import axios from 'axios';
import { UpdateTaskRepository } from 'apps/task-flow/src/task/repositories/update-task.repository';

@Injectable()
export class RequestService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly updateTaskRepository: UpdateTaskRepository,
  ) {}

  async execute(task: Task): Promise<void> {
    await this.updateTaskRepository.updateStatus(task.id, TaskStatus.RUNNING);
    try {
      const decryptedData = this.encryptionService.decrypt(task.data);
      const { url, method, headers, body } = JSON.parse(decryptedData);
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
