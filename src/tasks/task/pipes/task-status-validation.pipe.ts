import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    const result = value.toUpperCase();

    if (!this.isStatusValid(result)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return result;
  }

  isStatusValid(value) {
    const index = this.allowedStatuses.indexOf(value);
    return index !== -1;
  }
}
