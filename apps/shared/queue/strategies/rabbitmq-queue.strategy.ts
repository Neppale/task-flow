import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { connect, ChannelModel } from 'amqplib';
import { QueueStrategy } from '../interfaces/queue-strategy.interface';
import { CreateTaskParams } from 'apps/task-flow/src/task/services/create-task.service';

@Injectable()
export class RabbitMQQueueStrategy implements QueueStrategy, OnModuleInit {
  private connection: ChannelModel | null = null;
  private readonly connectionUrl: string;
  private readonly logger = new Logger(RabbitMQQueueStrategy.name);
  constructor() {
    this.connectionUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
  }

  async onModuleInit(): Promise<void> {
    try {
      this.connection = await connect(this.connectionUrl);
      this.logger.log('RabbitMQ connection initialized!');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error);
      throw error;
    }
  }

  async send(params: CreateTaskParams): Promise<void> {
    if (!this.connection) {
      throw new Error('RabbitMQ channel is not initialized');
    }

    const queueName = `queue_${params.type}`;

    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.publish(
      queueName,
      params.type,
      Buffer.from(JSON.stringify(params.data)),
      {
        headers: {
          'x-delay': params.date
            ? params.date.getTime() - Date.now()
            : undefined,
          'x-retries': params.retries,
        },
      },
    );
  }
}
