import { EntityRepository, QueryBuilder, Repository } from 'typeorm';
import { GetTaskFilterDto } from './DTO/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    public async createTask(title: string, description: string): Promise<Task> {
        const task: Task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

    public async getTasks(taskFilter: GetTaskFilterDto): Promise<any> {
        const { status, search } = taskFilter;
        const builder = this.createQueryBuilder('task');
        if (taskFilter && (search || status)) {
            if (status) {
                builder.andWhere('task.status = :status', { status });
            }
            if (search) {
                builder.andWhere(
                    '(task.title LIKE :search OR task.description LIKE :search)',
                    { search: `%${search}%` },
                );
            }
        }

        const tasks = builder.getMany();

        return tasks;
    }
}
