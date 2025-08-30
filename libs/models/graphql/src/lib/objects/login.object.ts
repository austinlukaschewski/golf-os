import { Field, ObjectType } from '@nestjs/graphql';

import type { LoginResponse as TLoginResponse } from '@golf-os/types';

@ObjectType()
export class LoginResponse implements TLoginResponse {
    @Field({ nullable: false })
    accessToken: string;

    @Field({ nullable: false })
    refreshToken: string;
}
