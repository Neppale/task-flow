import { Controller, Post } from '@nestjs/common';
import { SendTaskToQueueService } from './services/send-job-to-queue.service';
import { Body } from '@nestjs/common';

@Controller()
export class TaskController {
  constructor(private readonly sendJobToQueueService: SendTaskToQueueService) {}

  @Post()
  sendJobToQueue(
    @Body() body: { type: string; data: Record<string, any> },
  ): void {
    this.sendJobToQueueService.send(body.type, body.data);
  }
}
