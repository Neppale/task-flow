import { Inject, Injectable } from '@nestjs/common';
import type { QueueStrategy } from '../interfaces/queue-strategy.interface';
import { QUEUE_STRATEGY_TOKEN } from '../queue-type.enum';
import { CreateTaskParams } from 'apps/task-flow/src/task/services/create-task.service';

@Injectable()
export class QueueService {
  constructor(
    @Inject(QUEUE_STRATEGY_TOKEN)
    private readonly queueStrategy: QueueStrategy,
  ) {}

  async send(params: CreateTaskParams): Promise<void> {
    await this.queueStrategy.send(params);
  }
}
