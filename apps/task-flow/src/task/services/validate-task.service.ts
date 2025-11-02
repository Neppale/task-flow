/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CreateTaskDto } from 'apps/shared/types/dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { TaskType } from '@prisma/client';
import { RequestDto } from 'apps/shared/types/dto/request.dto';
import { ValidateObjectService } from 'utils/validate-object.service';

@Injectable()
export class ValidateTaskService {
  constructor(private readonly validateObjectService: ValidateObjectService) {}

  async validate(task: CreateTaskDto): Promise<void> {
    switch (task.type) {
      case TaskType.REQUEST:
        await this.validateObjectService.validate(RequestDto, task.data);
        break;
      default:
        break;
    }
  }
}
