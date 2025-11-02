import { Controller, Post, Body } from '@nestjs/common';
import { SendTaskToQueueService } from './services/send-task-to-queue.service';
import { CreateTaskDto } from 'apps/shared/types/dto/create-task.dto';

@Controller()
export class TaskController {
  constructor(
    private readonly sendTaskToQueueService: SendTaskToQueueService,
  ) {}

  @Post()
  async send(@Body() dto: CreateTaskDto): Promise<{ taskId: string }> {
    return await this.sendTaskToQueueService.send(dto.type, dto.data);
  }
}
