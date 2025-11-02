import { Controller, Post } from '@nestjs/common';
import { SendTaskToQueueService } from './services/send-task-to-queue.service';
import { Body } from '@nestjs/common';
import type { CreateTaskDto } from 'apps/shared/types/dto/create-task.dto';

@Controller()
export class TaskController {
  constructor(
    private readonly sendTaskToQueueService: SendTaskToQueueService,
  ) {}

  @Post()
  async send(
    @Body() { type, data }: CreateTaskDto,
  ): Promise<{ taskId: string }> {
    return await this.sendTaskToQueueService.send(type, data);
  }
}
