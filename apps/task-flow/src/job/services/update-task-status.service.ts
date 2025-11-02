import { Injectable, Logger } from '@nestjs/common';
import { UpdateTaskRepository } from '../repositories/update-task.repository';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class UpdateTaskStatusService {
  private readonly logger = new Logger(UpdateTaskStatusService.name);

  constructor(private readonly updateTaskRepository: UpdateTaskRepository) {}

  async update(id: string, status: TaskStatus): Promise<void> {
    await this.updateTaskRepository.updateStatus(id, status);
    this.logger.log(`Task ${id} status updated to: ${status}`);
  }
}
