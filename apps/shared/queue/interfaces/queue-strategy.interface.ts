export interface QueueStrategy {
  sendJobToQueue(type: string, data: Record<string, any>): Promise<void>;
}
