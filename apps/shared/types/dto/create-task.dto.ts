/* eslint-disable @typescript-eslint/no-unsafe-call */
import { TaskType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';

export class CreateTaskDto {
  @IsEnum(TaskType)
  @IsNotEmpty()
  type: TaskType;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  data: Record<string, any>;
}
