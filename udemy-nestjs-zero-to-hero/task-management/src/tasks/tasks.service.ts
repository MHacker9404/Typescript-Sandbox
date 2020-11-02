import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { from, Observable } from 'rxjs';
import { User } from '../auth/user.entity';
import * as uuid from 'uuid';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTaskFilterDto } from './DTO/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

// const tasks: Task[] = [];
// const tasks$: BehaviorSubject<any[]> = new BehaviorSubject([]);

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository) private _taskRepo: TaskRepository,
    ) {}

    public async tasks(): Promise<Task[]> {
        const tasks = await this._taskRepo.find();
        return [...tasks];
    }

    public async getTaskById(id: string, user: User): Promise<Task> {
        const task = await this._taskRepo.findTask(id, user);
        if (!task) {
            throw new NotFoundException(`Task with ID: ${id} not found`);
        }
        delete task.user;
        return task;
    }

    public async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = dto;
        const task = await this._taskRepo.createTask(title, description, user);
        return task;
    }

    public async deleteTaskById(id: string, user: User): Promise<Task[]> {
        const result = await this._taskRepo.delete({ id, user });
        if (!result.affected || result.affected === 0) {
            throw new BadRequestException(`${id} could not be deleted`);
        }
        return this._taskRepo.find();
    }

    public async updateTaskStatus(
        id: string,
        status: TaskStatus,
        user: User,
    ): Promise<Task> {
        const task = await this._taskRepo.findTask(id, user);
        if (!task) {
            throw new NotFoundException(`Task with ID: ${id} not found`);
        }
        task.status = status;
        await task.save();

        delete task.user;
        return task;
    }

    public async getTasks(
        taskFilter: GetTaskFilterDto,
        user: User,
    ): Promise<any> {
        return this._taskRepo.getTasks(taskFilter, user);
    }
}
