import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '../../../../shared/queue/services/queue.service';

@Injectable()
export class SendTaskToQueueService {
  private readonly logger = new Logger(SendTaskToQueueService.name);
  constructor(private readonly queueService: QueueService) {}

  async send(type: string, data: Record<string, any>): Promise<void> {
    this.logger.log(
      `Sending job to queue: ${type} with data: ${JSON.stringify(data)}`,
    );
    await this.queueService.send(type, data);
  }
}
