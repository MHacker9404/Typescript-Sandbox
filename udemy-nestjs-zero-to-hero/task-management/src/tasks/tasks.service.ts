import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { from, Observable } from 'rxjs';
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

    public async getTaskById(id: string): Promise<Task> {
        const task = await this._taskRepo.findOne(id);
        if (!task) {
            throw new NotFoundException(`Task with ID: ${id} not found`);
        }
        return task;
    }

    public async createTask(dto: CreateTaskDto): Promise<Task> {
        const { title, description } = dto;
        const task = await this._taskRepo.createTask(title, description);
        return task;
    }

    public async deleteTaskById(id: string): Promise<Task[]> {
        const result = await this._taskRepo.delete({ id: id });
        return this._taskRepo.find();
    }

    public async updateTaskStatus(
        id: string,
        status: TaskStatus,
    ): Promise<Task> {
        const task = await this._taskRepo.findOne(id);
        if (!task) {
            throw new NotFoundException(`Task with ID: ${id} not found`);
        }
        task.status = status;
        await task.save();

        return task;
    }

    public async getTasks(taskFilter: GetTaskFilterDto): Promise<any> {
        return this._taskRepo.getTasks(taskFilter);
    }
}
