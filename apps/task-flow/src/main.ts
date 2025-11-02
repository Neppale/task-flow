import { NestFactory } from '@nestjs/core';
import { JobModule } from './job/job.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(JobModule);
  await app.listen(process.env.API_PORT ?? 3000);
}
void bootstrap();
