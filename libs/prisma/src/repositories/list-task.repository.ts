/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TaskStatus, Task, Prisma } from '@prisma/client';

export interface ListTaskFilters {
  type?: string;
  status?: TaskStatus;
  decryptData?: boolean;
  skip?: number;
  take?: number;
}

@Injectable()
export class ListTaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Task | null> {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async findMany(filters: ListTaskFilters): Promise<{
    tasks: Task[];
    totalItems: number;
  }> {
    const where: Prisma.TaskWhereInput = {};
    if (filters.type) {
      where.type = filters.type;
    }
    if (filters.status) {
      where.status = filters.status;
    }

    const [tasks, totalItems] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip: filters.skip,
        take: filters.take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.task.count({ where }),
    ]);

    return { tasks, totalItems };
  }
}
