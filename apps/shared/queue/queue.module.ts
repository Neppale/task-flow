/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { Module, Provider, Logger } from '@nestjs/common';
import { QueueService } from './services/queue.service';
import { RedisQueueStrategy } from './strategies/redis-queue.strategy';
import { RabbitMQQueueStrategy } from './strategies/rabbitmq-queue.strategy';
import { QueueStrategy } from './interfaces/queue-strategy.interface';
import { QUEUE_STRATEGY_TOKEN, QueueType } from './queue-type.enum';

const logger = new Logger('QueueModule');

const queueStrategyProvider: Provider = {
  provide: QUEUE_STRATEGY_TOKEN,
  useFactory: (): QueueStrategy => {
    const queueType = process.env.QUEUE_TYPE;

    logger.log(`TaskFlow is using ${queueType} queue strategy.`);
    if (!queueType) {
      throw new Error('QUEUE_TYPE is not set');
    }

    switch (queueType) {
      case QueueType.RABBITMQ:
        return new RabbitMQQueueStrategy();
      case QueueType.REDIS:
      default:
        return new RedisQueueStrategy();
    }
  },
};

@Module({
  providers: [
    QueueService,
    queueStrategyProvider,
    RedisQueueStrategy,
    RabbitMQQueueStrategy,
  ],
  exports: [QueueService],
})
export class QueueModule {}
