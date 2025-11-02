import { Controller, Post } from '@nestjs/common';
import { SendJobToQueueService } from './services/send-job-to-queue.service';
import { Body } from '@nestjs/common';

@Controller()
export class JobController {
  constructor(private readonly sendJobToQueueService: SendJobToQueueService) {}

  @Post()
  sendJobToQueue(
    @Body() body: { type: string; data: Record<string, any> },
  ): void {
    this.sendJobToQueueService.sendJobToQueue(body.type, body.data);
  }
}
