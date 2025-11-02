import { Inject, Injectable } from '@nestjs/common';
import type { QueueStrategy } from '../interfaces/queue-strategy.interface';
import { QUEUE_STRATEGY_TOKEN } from '../queue-type.enum';

@Injectable()
export class QueueService {
  constructor(
    @Inject(QUEUE_STRATEGY_TOKEN)
    private readonly queueStrategy: QueueStrategy,
  ) {}

  async sendJobToQueue(type: string, data: Record<string, any>): Promise<void> {
    await this.queueStrategy.sendJobToQueue(type, data);
  }
}
