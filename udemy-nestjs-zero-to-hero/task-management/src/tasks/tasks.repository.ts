import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository, EntitySchema } from 'typeorm';
import { GetTaskFilterDto } from './DTO/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    findTask(id: string, user: User) {
        const builder = this.createQueryBuilder('task');
        builder.where({ id: id, user: user.id });
        return builder.getOne();
    }

    public async createTask(
        title: string,
        description: string,
        user: User,
    ): Promise<Task> {
        const task: Task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user; //  removes the user property from the returned task
        return task;
    }

    public async getTasks(
        taskFilter: GetTaskFilterDto,
        user: User,
    ): Promise<any> {
        const { status, search } = taskFilter;
        const builder = this.createQueryBuilder('task');
        builder.where({ user: user.id });
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
