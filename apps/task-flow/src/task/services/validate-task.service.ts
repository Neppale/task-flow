/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { TaskType } from '@prisma/client';
import { RequestDto } from 'apps/shared/types/dto/request.dto';
import { ValidateObjectService } from 'utils/validate-object.service';
import { CreateTaskParams } from 'apps/task-flow/src/task/services/create-task.service';

@Injectable()
export class ValidateTaskService {
  constructor(private readonly validateObjectService: ValidateObjectService) {}

  async validate(params: CreateTaskParams): Promise<void> {
    switch (params.type) {
      case TaskType.REQUEST:
        await this.validateObjectService.validate(RequestDto, params.data);
        break;
      default:
        break;
    }
  }
}
