import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Patch,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTaskFilterDto } from './DTO/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation-status.pipe';
import { TaskStatus } from './task.model';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller(`tasks`)
export class TasksController {
    constructor(private _taskService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
        console.info(filterDto);

        let tasks: Task[];
        if (filterDto && (filterDto.search || filterDto.status)) {
            tasks = [...this._taskService.tasks];
        } else {
            tasks = [...this._taskService.tasks];
        }
        return tasks;
    }

    @Get(`/:id`)
    getTaskById(@Param(`id`) id: string): Task {
        // console.info(id);
        const task: Task = this._taskService.getTaskById(id);
        return { ...task };
    }

    @Delete(`/:id`)
    deleteTaskById(@Param(`id`) id: string): Task[] {
        // console.info(id);
        const tasks: Task[] = this._taskService.deleteTaskById(id);
        return [...tasks];
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() dto: CreateTaskDto): Task {
        const task = this._taskService.createTask(dto);
        return task;
    }

    @Patch(`/:id`)
    updateTask(
        @Param(`id`) id: string,
        @Body(`status`, TaskStatusValidationPipe) status: TaskStatus,
    ): Task {
        const task = this._taskService.updateTaskStatus(id, status);
        return task;
    }
}
