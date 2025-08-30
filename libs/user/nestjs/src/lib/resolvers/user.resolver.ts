import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { User } from '@golf-os/models/graphql';

import { CurrentUser } from '../decorators/current-user.decorator';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(@Inject(UserService) private readonly userService: UserService) {}

    @Query(() => User, { name: 'me', nullable: false })
    async me(@CurrentUser() user: User) {
        return this.userService.getMeById(user.id);
    }
}
