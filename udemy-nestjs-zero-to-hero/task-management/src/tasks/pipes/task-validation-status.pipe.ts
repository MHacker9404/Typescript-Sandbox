import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';
import * as _ from 'lodash';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
    private readonly statuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value: string, metadata: ArgumentMetadata) {
        const ucase = value.toUpperCase();
        if (_.some(this.statuses, (status) => status === ucase)) return value;

        throw new BadRequestException(`'${value}' is an invalid status`);
    }
}
