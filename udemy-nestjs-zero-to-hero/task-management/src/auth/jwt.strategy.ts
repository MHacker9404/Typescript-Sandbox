import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.intefrace';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStratgey extends PassportStrategy(Strategy) {
    constructor(private _userRepo: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'this-should-be-really-long',
        });
    }

    public async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;

        const user = await this._userRepo.findOne({ username });
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
