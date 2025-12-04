import { TaskType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreateTaskDto {
  @IsEnum(TaskType)
  @IsNotEmpty()
  type: TaskType;

  @IsObject()
  @IsNotEmpty()
  data: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cron?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  retries?: number;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  date?: Date;
}
