import { Controller } from '@nestjs/common';
import { RequestService } from '../services/request.service';
import { MessagePattern } from '@nestjs/microservices';
import { type Task, TaskType } from '@prisma/client';

@Controller()
export class WorkerHandler {
  constructor(private readonly requestService: RequestService) {}

  @MessagePattern('tasks')
  async work(task: Task): Promise<void> {
    switch (task.type) {
      case TaskType.REQUEST:
        return await this.requestService.execute(task);
      default:
        throw new Error('Invalid task type');
    }
  }
}
