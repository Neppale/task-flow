import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../../../../libs/config/src/logger/services/logger.service';

@Injectable()
export class SendJobToQueueService {
  constructor(
    // private readonly queueService: QueueService,
    private readonly logger: LoggerService,
  ) {}

  sendJobToQueue(type: string, data: Record<string, any>) {
    this.logger.log(
      `Sending job to queue: ${type} with data: ${JSON.stringify(data)}`,
    );
  }
}
