import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { SendTaskToQueueService } from '../services/send-job-to-queue.service';

describe('TaskController', () => {
  let appController: TaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [SendTaskToQueueService],
    }).compile();

    appController = app.get<TaskController>(TaskController);
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
