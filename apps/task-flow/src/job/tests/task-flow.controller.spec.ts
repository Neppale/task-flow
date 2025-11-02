import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from '../job.controller';
import { SendJobToQueueService } from '../services/send-job-to-queue.service';

describe('TaskFlowController', () => {
  let appController: JobController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [SendJobToQueueService],
    }).compile();

    appController = app.get<JobController>(JobController);
  });

  it('should send job to queue', () => {
    expect(
      appController.sendJobToQueue({
        type: 'test',
        data: { message: 'Hello World' },
      }),
    ).toBeUndefined();
  });
});
