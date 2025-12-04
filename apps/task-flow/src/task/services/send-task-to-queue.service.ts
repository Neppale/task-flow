import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '../../../../shared/queue/services/queue.service';
import { CreateTaskService } from './create-task.service';
import { UpdateTaskStatusService } from './update-task-status.service';
import { TaskStatus, TaskType } from '@prisma/client';

@Injectable()
export class SendTaskToQueueService {
  private readonly logger = new Logger(SendTaskToQueueService.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly createTaskService: CreateTaskService,
    private readonly updateTaskStatusService: UpdateTaskStatusService,
  ) {}

  async send(
    type: TaskType,
    data: Record<string, any>,
  ): Promise<{ taskId: string }> {
    this.logger.log(
      `Sending job to queue: ${type} with data: ${JSON.stringify(data)}`,
    );

    const { id: taskId } = await this.createTaskService.create({
      type,
      data,
    });

    try {
      await this.queueService.send(type, data);
      await this.updateTaskStatusService.update(taskId, TaskStatus.COMPLETED);
      this.logger.log(`Task ${taskId} successfully scheduled to queue`);
      return { taskId };
    } catch (error) {
      await this.updateTaskStatusService.update(taskId, TaskStatus.FAILED);
      this.logger.error(`Failed to schedule task ${taskId} to queue`, error);
      throw error;
    }
  }
}
