import { TaskType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsObject } from 'class-validator';

export class CreateTaskDto {
  @IsEnum(TaskType)
  @IsNotEmpty()
  type: TaskType;

  @IsObject()
  @IsNotEmpty()
  data: Record<string, any>;
}
