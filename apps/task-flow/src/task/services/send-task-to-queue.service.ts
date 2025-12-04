import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '../../../../shared/queue/services/queue.service';
import { CreateTaskParams, CreateTaskService } from './create-task.service';
import { UpdateTaskStatusService } from './update-task-status.service';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class SendTaskToQueueService {
  private readonly logger = new Logger(SendTaskToQueueService.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly createTaskService: CreateTaskService,
    private readonly updateTaskStatusService: UpdateTaskStatusService,
  ) {}

  async send(params: CreateTaskParams): Promise<{ taskId: string }> {
    this.logger.log(
      `Sending job to queue: ${params.type} with data: ${JSON.stringify(params.data)}`,
    );

    const { id: taskId } = await this.createTaskService.create(params);

    try {
      await this.queueService.send(params);
      this.logger.log(`Task ${taskId} successfully scheduled to queue`);
      return { taskId };
    } catch (error) {
      await this.updateTaskStatusService.update(taskId, TaskStatus.FAILED);
      this.logger.error(`Failed to schedule task ${taskId} to queue`, error);
      throw error;
    }
  }
}
