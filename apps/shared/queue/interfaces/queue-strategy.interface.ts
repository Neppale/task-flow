export interface QueueStrategy {
  send(type: string, data: Record<string, any>): Promise<void>;
}
