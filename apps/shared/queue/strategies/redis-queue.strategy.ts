import { Injectable, Logger } from '@nestjs/common';
import { QueueStrategy } from '../interfaces/queue-strategy.interface';

@Injectable()
export class RedisQueueStrategy implements QueueStrategy {
  private readonly logger = new Logger(RedisQueueStrategy.name);

  // constructor(private readonly redisClient: Redis) {}

  async sendJobToQueue(type: string, data: Record<string, any>): Promise<void> {
    await Promise.resolve();
    this.logger.log(
      `Sending job to queue: ${type} with data: ${JSON.stringify(data)}`,
    );
  }
}
