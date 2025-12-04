import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { Task, TaskType } from '@prisma/client';
import { RequestService } from './services/request.service';

@Injectable()
export class BullMQWorkerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BullMQWorkerService.name);
  private worker: Worker | null = null;
  private redisConnection: Redis;

  constructor(private readonly requestService: RequestService) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    this.redisConnection = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
    });
  }

  onModuleInit(): void {
    this.worker = new Worker(
      'tasks',
      async (job) => {
        const task = job.data as Task;
        this.logger.log(`Processing task ${task.id} of type ${task.type}`);

        switch (task.type) {
          case TaskType.REQUEST:
            return await this.requestService.execute(task);
          default:
            throw new Error(`Invalid task type: ${task.type as string}`);
        }
      },
      {
        connection: this.redisConnection,
        concurrency: 5,
      },
    );

    this.worker.on('completed', (job) => {
      this.logger.log(`Job ${job.id} completed`);
    });

    this.worker.on('failed', (job, err) => {
      this.logger.error(`Job ${job?.id} failed: ${err.message}`, err.stack);
    });

    this.worker.on('error', (err) => {
      this.logger.error(`Worker error: ${err.message}`, err.stack);
    });

    this.logger.log('BullMQ Worker initialized and listening for jobs');
  }

  async onModuleDestroy(): Promise<void> {
    if (this.worker) {
      await this.worker.close();
      this.logger.log('BullMQ Worker closed');
    }
    await this.redisConnection.quit();
  }
}
