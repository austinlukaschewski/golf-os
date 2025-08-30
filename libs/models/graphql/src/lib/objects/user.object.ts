import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { User as TUser, UserPermission } from '@golf-os/types';

import { TimestampAuditable } from './auditable.object';
import { Golfer } from './golfer.object';
import { UserPassword } from './user-password.object';

registerEnumType(UserPermission, { name: 'UserPermission' });

@ObjectType()
export class User extends TimestampAuditable implements TUser {
    @Field(() => ID, { nullable: false })
    id: string;

    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    email: string;

    @Field({ nullable: true })
    lastLogin?: Date;

    @Field(() => [UserPermission], { nullable: false })
    permissions: UserPermission[];

    @Field({ nullable: false })
    golferId: string;

    @Field(() => UserPassword, { nullable: false })
    password: UserPassword;

    @Field(() => Golfer, { nullable: false })
    golfer: Golfer;
}
