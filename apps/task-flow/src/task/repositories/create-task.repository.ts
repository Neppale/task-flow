import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/services/prisma.service';
import { TaskStatus, Task, TaskType } from '@prisma/client';

export interface CreateTaskData {
  type: TaskType;
  data: string;
  status: TaskStatus;
}

@Injectable()
export class CreateTaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTaskData): Promise<Task> {
    return await this.prisma.task.create({
      data,
    });
  }
}
