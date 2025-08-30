import { Field, Float, ObjectType } from '@nestjs/graphql';

import type { Ghin as TGhin } from '@golf-os/types';

@ObjectType()
export class Ghin implements TGhin {
    @Field({ nullable: true })
    id?: number;

    @Field({ nullable: true })
    clubName?: string;

    @Field(() => Float, { nullable: true })
    handicapIndex?: number;
}
