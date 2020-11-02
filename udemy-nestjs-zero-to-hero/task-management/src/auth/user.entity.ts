import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/task.entity';

@Entity({ name: 'Users', schema: 'auth' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Column({ unique: true })
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    @Column()
    password: string;

    @OneToMany((type) => Task, (task) => task.user, {
        eager: true,
        onDelete: 'CASCADE',
        nullable: false,
    })
    tasks: Task[];

    // @Column()
    // salt: string;

    public async validatePassword(password: string): Promise<boolean> {
        const match: boolean = await bcrypt.compare(password, this.password);
        return match;
    }
}
