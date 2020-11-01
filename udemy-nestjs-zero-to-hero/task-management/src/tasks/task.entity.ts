import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity({ name: 'Tasks' })
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() title: string;
    @Column() description: string;
    @Column() status: TaskStatus;
}
