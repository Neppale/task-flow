import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, ChannelModel } from 'amqplib';
import { QueueStrategy } from '../interfaces/queue-strategy.interface';

@Injectable()
export class RabbitMQQueueStrategy implements QueueStrategy, OnModuleInit {
  private connection: ChannelModel | null = null;
  private readonly connectionUrl: string;

  constructor() {
    this.connectionUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
  }

  async onModuleInit(): Promise<void> {
    this.connection = await connect(this.connectionUrl);
  }

  async sendJobToQueue(type: string, data: Record<string, any>): Promise<void> {
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
