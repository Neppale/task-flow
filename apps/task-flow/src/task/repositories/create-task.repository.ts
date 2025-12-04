import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/services/prisma.service';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class CreateTaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return await this.prisma.task.create({
      data,
    });
  }
}
