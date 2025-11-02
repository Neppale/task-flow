import { Module, Provider } from '@nestjs/common';
import { QueueService } from './services/queue.service';
import { RedisQueueStrategy } from './strategies/redis-queue.strategy';
import { RabbitMQQueueStrategy } from './strategies/rabbitmq-queue.strategy';
import { QueueStrategy } from './interfaces/queue-strategy.interface';
import { QUEUE_STRATEGY_TOKEN, QueueType } from './queue-type.enum';

const queueStrategyProvider: Provider = {
  provide: QUEUE_STRATEGY_TOKEN,
  useFactory: (): QueueStrategy => {
    const queueType =
      QueueType[process.env.QUEUE_TYPE as keyof typeof QueueType] ??
      QueueType.REDIS;

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
