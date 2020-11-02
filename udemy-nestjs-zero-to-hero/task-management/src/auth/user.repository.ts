import { ConflictException } from '@nestjs/common';
import { EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { AuthCredentials } from './DTO/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async signUp(credentials: AuthCredentials): Promise<void> {
        const { username, password } = credentials;

        const salt = await bcrypt.genSalt();

        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password, salt);
        try {
            await user.save();
        } catch (error) {
            throw new ConflictException('username already taken');
        }
    }

    public async validateUserPassword(
        credentials: AuthCredentials,
    ): Promise<string> {
        const { username, password } = credentials;
        const user = await this.findOne({ username: username });

        const result =
            user && (await user.validatePassword(password))
                ? user.username
                : null;
        return result;
    }

    private async hashPassword(
        password: string,
        salt: string,
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
