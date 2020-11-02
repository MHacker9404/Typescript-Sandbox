import {
    Body,
    Controller,
    Post,
    // Req,
    // UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessToken } from './access-token.interface';
import { AuthService } from './auth.service';
import { AuthCredentials } from './DTO/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private _authSvc: AuthService) {}

    @Post('/signup') public async signUp(
        @Body(ValidationPipe) credentials: AuthCredentials,
    ): Promise<void> {
        return this._authSvc.signUp(credentials);
    }

    @Post('/signin') public async signIn(
        @Body(ValidationPipe) credentials: AuthCredentials,
    ): Promise<AccessToken> {
        return this._authSvc.signIn(credentials);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // // public async test(@Req() req) {
    // public async test(@GetUser() user: User) {
    //     console.info(user);
    // }
}
