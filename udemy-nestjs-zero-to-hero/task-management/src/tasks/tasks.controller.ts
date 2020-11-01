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
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller(`tasks`)
export class TasksController {
    constructor(private _taskService: TasksService) {}

    @Get(`/:id`)
    public async getTaskById(@Param(`id`) id: string): Promise<Task> {
        const task: Task = await this._taskService.getTaskById(id);
        return task;
    }

    @Post()
    @UsePipes(ValidationPipe)
    public async createTask(@Body() dto: CreateTaskDto): Promise<Task> {
        const task = await this._taskService.createTask(dto);
        return task;
    }

    @Delete(`/:id`)
    public async deleteTaskById(@Param(`id`) id: string): Promise<Task[]> {
        const tasks: Task[] = await this._taskService.deleteTaskById(id);
        return [...tasks];
    }

    @Get()
    public async getTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto,
    ): Promise<Task[]> {
        return this._taskService.getTasks(filterDto);
    }

    @Patch(`/:id`)
    public async updateTask(
        @Param(`id`) id: string,
        @Body(`status`, TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        const task = await this._taskService.updateTaskStatus(id, status);
        return task;
    }
}
