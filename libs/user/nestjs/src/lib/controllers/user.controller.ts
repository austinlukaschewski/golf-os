import { Controller, Get } from '@nestjs/common';

import { User } from '@golf-os/types';

import { CurrentUser } from '../decorators/current-user.decorator';
import { UserService } from '../services/user.service';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    me(@CurrentUser() user: Omit<User, 'password' | 'golfer'>) {
        return this.userService.getMeById(user.id);
    }
}
