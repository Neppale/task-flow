import { Injectable } from '@nestjs/common';
import {
  ListTaskRepository,
  ListTaskFilters,
} from '../repositories/list-task.repository';
import { EncryptionService } from '../encryption.service';
import { Task, TaskStatus } from '@prisma/client';

export interface TaskWithDecryptedData {
  id: string;
  type: string;
  data: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetTasksResult {
  tasks: TaskWithDecryptedData[];
  totalItems: number;
}

@Injectable()
export class GetTasksService {
  constructor(
    private readonly listTaskRepository: ListTaskRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async get(filters?: ListTaskFilters): Promise<GetTasksResult> {
    const { tasks, totalItems } = await this.listTaskRepository.findMany(
      filters || {},
    );

    const tasksWithDecryptedData: TaskWithDecryptedData[] = tasks.map(
      (task: Task) => {
        const decryptedData = this.encryptionService.decrypt(task.data);
        return {
          id: task.id,
          type: task.type,
          data: decryptedData,
          status: task.status,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        };
      },
    );

    return {
      tasks: tasksWithDecryptedData,
      totalItems,
    };
  }
}
