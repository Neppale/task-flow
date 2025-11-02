/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TaskStatus, Task } from '@prisma/client';

export interface CreateTaskData {
  type: string;
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
