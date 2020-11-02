import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from './access-token.interface';
import { AuthCredentials } from './DTO/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.intefrace';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private _userRepo: UserRepository,
        private _jwtSvc: JwtService,
    ) {}

    public signUp = async (credentials: AuthCredentials): Promise<void> =>
        this._userRepo.signUp(credentials);

    public async signIn(credentials: AuthCredentials): Promise<AccessToken> {
        const username = await this._userRepo.validateUserPassword(credentials);
        if (!username) {
            throw new UnauthorizedException('invalid credentials');
        }
        const payload: JwtPayload = { username };
        const jwt: string = await this._jwtSvc.signAsync(payload);
        return { accessToken: jwt };
    }
}
