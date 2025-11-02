import { NestFactory } from '@nestjs/core';
import { TaskModule } from './job/task.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.API_PORT ?? 3000);
}
void bootstrap();
