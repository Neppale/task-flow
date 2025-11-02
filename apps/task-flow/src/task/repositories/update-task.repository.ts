/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/services/prisma.service';
import { TaskStatus, Task } from '@prisma/client';

@Injectable()
export class UpdateTaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    return await this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }
}
