/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { QueueStrategy } from '../interfaces/queue-strategy.interface';

@Injectable()
export class RedisQueueStrategy
  implements QueueStrategy, OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(RedisQueueStrategy.name);
  private redisConnection: Redis;
  private readonly queues: Map<string, Queue> = new Map();
  private readonly redisUrl: string;

  constructor() {
    this.redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  }

  onModuleInit(): void {
    this.redisConnection = new Redis(this.redisUrl, {
      maxRetriesPerRequest: null,
    });
    this.logger.log('Redis connection for BullMQ initialized!');
  }
  catch(error) {
    this.logger.error('Failed to connect to Redis', error);
    throw error;
  }

  async onModuleDestroy(): Promise<void> {
    for (const queue of this.queues.values()) {
      await queue.close();
    }
    await this.redisConnection.quit();
  }

  private getQueue(queueName: string): Queue {
    if (!this.queues.has(queueName)) {
      const queue = new Queue(queueName, {
        connection: this.redisConnection,
      });
      this.queues.set(queueName, queue);
    }
    return this.queues.get(queueName)!;
  }

  async sendJobToQueue(type: string, data: Record<string, any>): Promise<void> {
    const queueName = `queue_${type}`;
    const queue = this.getQueue(queueName);

    await queue.add(type, data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }
}
