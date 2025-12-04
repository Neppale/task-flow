import { CreateTaskParams } from 'apps/task-flow/src/task/services/create-task.service';

export interface QueueStrategy {
  send(params: CreateTaskParams): Promise<void>;
}
