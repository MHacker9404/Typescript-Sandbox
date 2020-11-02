import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStratgey } from './jwt.strategy';
import { UserRepository } from './user.repository';

import config from 'config';
const jwt: any = config.get('jwt');

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStratgey],
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || jwt.secret,
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
