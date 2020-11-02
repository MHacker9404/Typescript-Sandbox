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
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTaskFilterDto } from './DTO/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation-status.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller(`tasks`)
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private _taskService: TasksService) {}

    @Get(`/:id`)
    public async getTaskById(
        @Param(`id`) id: string,
        @GetUser() user: User,
    ): Promise<Task> {
        const task: Task = await this._taskService.getTaskById(id, user);
        return task;
    }

    @Post()
    @UsePipes(ValidationPipe)
    public async createTask(
        @Body() dto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        const task = await this._taskService.createTask(dto, user);
        return task;
    }

    @Delete(`/:id`)
    public async deleteTaskById(
        @Param(`id`) id: string,
        @GetUser() user: User,
    ): Promise<Task[]> {
        const tasks: Task[] = await this._taskService.deleteTaskById(id, user);
        return [...tasks];
    }

    @Get()
    public async getTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this._taskService.getTasks(filterDto, user);
    }

    @Patch(`/:id`)
    public async updateTask(
        @Param(`id`) id: string,
        @Body(`status`, TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User,
    ): Promise<Task> {
        const task = await this._taskService.updateTaskStatus(id, status, user);
        return task;
    }
}
