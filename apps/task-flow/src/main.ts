import { NestFactory } from '@nestjs/core';
import { TaskModule } from './job/task.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(TaskModule);
  await app.listen(process.env.API_PORT ?? 3000);
}
void bootstrap();
