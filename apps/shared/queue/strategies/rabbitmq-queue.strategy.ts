import { Injectable } from '@nestjs/common';
import { QueueStrategy } from '../interfaces/queue-strategy.interface';

@Injectable()
export class RabbitMQQueueStrategy implements QueueStrategy {
  // constructor(private readonly channel: Channel) {}

  async sendJobToQueue(type: string, data: Record<string, any>): Promise<void> {
    await Promise.resolve();
    console.log(
      `[RabbitMQ] Sending job to queue: ${type} with data: ${JSON.stringify(data)}`,
    );
  }
}
