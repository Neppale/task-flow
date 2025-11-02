import { Injectable } from '@nestjs/common';
import { QueueStrategy } from '../interfaces/queue-strategy.interface';

@Injectable()
export class RedisQueueStrategy implements QueueStrategy {
  // constructor(private readonly redisClient: Redis) {}

  async sendJobToQueue(type: string, data: Record<string, any>): Promise<void> {
    await Promise.resolve();
    console.log(
      `[Redis] Sending job to queue: ${type} with data: ${JSON.stringify(data)}`,
    );
  }
}
