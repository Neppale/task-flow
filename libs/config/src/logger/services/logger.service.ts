import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  constructor() {}

  log(message: string) {
    console.log(JSON.stringify({ message }));
  }
}
