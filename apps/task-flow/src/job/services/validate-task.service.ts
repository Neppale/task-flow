/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CreateTaskDto } from 'apps/shared/types/dto/create-task.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isInstance } from 'class-validator';
import { Request as RequestType } from 'apps/shared/types/request.model';
import { TaskType } from '@prisma/client';

@Injectable()
export class ValidateTaskService {
  validate(task: CreateTaskDto): void {
    if (task.type === TaskType.REQUEST && !isInstance(task.data, RequestType)) {
      throw new BadRequestException({ message: 'Data is not type of Request' });
    }
  }
}
