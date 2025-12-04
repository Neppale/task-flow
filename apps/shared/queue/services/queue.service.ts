import { Inject, Injectable } from '@nestjs/common';
import type { QueueStrategy } from '../interfaces/queue-strategy.interface';
import { QUEUE_STRATEGY_TOKEN } from '../queue-type.enum';
import { Task } from '@prisma/client';

@Injectable()
export class QueueService {
  constructor(
    @Inject(QUEUE_STRATEGY_TOKEN)
    private readonly queueStrategy: QueueStrategy,
  ) {}

  async send(task: Task): Promise<void> {
    await this.queueStrategy.send(task);
  }
}
