import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './DTO/create-task.dto';
import * as _ from 'lodash';
import { GetTaskFilterDto } from './DTO/get-tasks-filter.dto';

const tasks: Task[] = [];
// const tasks$: BehaviorSubject<any[]> = new BehaviorSubject([]);

@Injectable()
export class TasksService {
    updateTaskStatus(id: string, status: TaskStatus): Task {
        // console.info(id);
        const task: Task = _.find(tasks, { id: id });
        task.status = status;
        return { ...task };
    }

    deleteTaskById(id: string): Task[] {
        const index = _.findIndex(tasks, (task) => task.id === id);
        if (index > -1) {
            tasks.splice(index, 1);
        }
        return [...tasks];
    }

    public getTaskById(id: string): Task {
        // console.info(id);
        const task: Task = _.find(tasks, { id: id });
        // console.info(`find`, task);
        return { ...task };
    }

    public get tasks(): Task[] {
        return [...tasks];
    }

    public filterTasks(taskFilter: GetTaskFilterDto): Task[] {
        const filteredTasks = _.filter(
            tasks,
            (task: Task) =>
                task.title.includes(taskFilter.search) ||
                task.description.includes(taskFilter.search) ||
                task.status === taskFilter.status,
        );
        return [...filteredTasks];
    }

    public createTask(dto: CreateTaskDto): Task {
        const { title, description } = dto;

        const task: Task = {
            id: uuid.v1(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        tasks.push(task);
        return task;
    }
}
