import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { SendJobToQueueService } from './services/send-job-to-queue.service';
import { ConfigModule } from '../../../../libs/config/src/config.module';
import { QueueModule } from '../../../shared/queue/queue.module';

@Module({
  imports: [ConfigModule, QueueModule],
  controllers: [JobController],
  providers: [SendJobToQueueService],
})
export class JobModule {}
