import { Controller, Post } from '@nestjs/common';
import { SendTaskToQueueService } from './services/send-task-to-queue.service';
import { Body } from '@nestjs/common';

@Controller()
export class TaskController {
  constructor(
    private readonly sendTaskToQueueService: SendTaskToQueueService,
  ) {}

  @Post()
  async send(
    @Body() body: { type: string; data: Record<string, any> },
  ): Promise<{ taskId: string }> {
    return await this.sendTaskToQueueService.send(body.type, body.data);
  }
}
