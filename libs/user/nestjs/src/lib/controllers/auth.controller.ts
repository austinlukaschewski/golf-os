import { Body, Controller, Get, Post } from '@nestjs/common';

import type { LoginRequest, LoginResponse, RefreshTokenResponse, User } from '@golf-os/types';

import { CurrentUser } from '../decorators/current-user.decorator';
import { Public } from '../decorators/public.decorator';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/login')
    async login(@Body() { username, password }: LoginRequest): Promise<LoginResponse> {
        return this.authService.login(username, password);
    }

    @Get('/refresh')
    async refresh(@CurrentUser() user: Omit<User, 'password' | 'golfer'>): Promise<RefreshTokenResponse> {
        return this.authService.refreshToken(user);
    }
}
