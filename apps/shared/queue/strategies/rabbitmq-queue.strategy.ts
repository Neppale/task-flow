import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { connect, ChannelModel } from 'amqplib';
import { QueueStrategy } from '../interfaces/queue-strategy.interface';

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

  async send(type: string, data: Record<string, any>): Promise<void> {
    if (!this.connection) {
      throw new Error('RabbitMQ channel is not initialized');
    }

    const queueName = `queue_${type}`;

    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, {
      durable: true,
    });

    const message = Buffer.from(JSON.stringify(data));

    channel.sendToQueue(queueName, message);
  }
}
