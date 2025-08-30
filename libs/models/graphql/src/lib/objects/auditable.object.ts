import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

import type {
    TimestampAuditable as TTimestampAuditable,
    TimestampAuditableWithSoftDelete as TTimestampAuditableWithSoftDelete,
} from '@golf-os/types';

@ObjectType({ isAbstract: true })
export abstract class TimestampAuditable implements TTimestampAuditable {
    @Field(() => GraphQLISODateTime, { nullable: false })
    createdAt: Date;

    @Field(() => GraphQLISODateTime, { nullable: false })
    updatedAt: Date;
}

@ObjectType({ isAbstract: true })
export abstract class TimestampAuditableWithSoftDelete
    extends TimestampAuditable
    implements TTimestampAuditableWithSoftDelete
{
    @Field(() => GraphQLISODateTime, { nullable: false })
    deletedAt: Date;
}
