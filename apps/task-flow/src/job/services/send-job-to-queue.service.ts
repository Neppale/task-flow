import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../../../../libs/config/src/logger/services/logger.service';
import { QueueService } from '../../../../shared/queue/services/queue.service';

@Injectable()
export class SendJobToQueueService {
  constructor(
    private readonly queueService: QueueService,
    private readonly logger: LoggerService,
  ) {}

  async sendJobToQueue(type: string, data: Record<string, any>) {
    this.logger.log(
      `Sending job to queue: ${type} with data: ${JSON.stringify(data)}`,
    );
    await this.queueService.sendJobToQueue(type, data);
  }
}
