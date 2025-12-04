import { Task } from '@prisma/client';

export interface QueueStrategy {
  send(task: Task): Promise<void>;
}
