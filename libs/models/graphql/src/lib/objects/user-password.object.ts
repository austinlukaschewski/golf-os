import { Field, ID, ObjectType } from '@nestjs/graphql';

import type { UserPassword as TUserPassword } from '@golf-os/types';

import { TimestampAuditable } from './auditable.object';

@ObjectType()
export class UserPassword extends TimestampAuditable implements TUserPassword {
    @Field(() => ID, { nullable: false })
    id: string;

    @Field({ nullable: false })
    hash: string;

    @Field({ nullable: false, defaultValue: false })
    isResetting: boolean;
}
