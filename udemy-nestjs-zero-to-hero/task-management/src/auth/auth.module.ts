import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStratgey } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStratgey],
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret: 'this-should-be-really-long',
            signOptions: {
                expiresIn: 300,
            },
        }),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
    ],
    exports: [JwtStratgey, PassportModule],
})
export class AuthModule {}
