import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Patch,
    Query,
} from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTaskFilterDto } from './DTO/get-tasks-filter.dto';
import { TaskStatus } from './task.model';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller(`tasks`)
export class TasksController {
    constructor(private _taskService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
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
    createTask(@Body() dto: CreateTaskDto): Task {
        const task = this._taskService.createTask(dto);
        return task;
    }

    @Patch(`/:id`)
    updateTask(
        @Param(`id`) id: string,
        @Body(`status`) status: TaskStatus,
    ): Task {
        const task = this._taskService.updateTaskStatus(id, status);
        return task;
    }
}
