import { Field, ObjectType } from '@nestjs/graphql';

import type { MinIOObject as TMinIOObject, OptionalMinIOObject as TOptionalMinIOObject } from '@golf-os/types';

@ObjectType()
export class MinIOObject implements TMinIOObject {
    @Field({ nullable: false })
    bucket: string;

    @Field({ nullable: false })
    path: string;
}

@ObjectType()
export class OptionalMinIOObject implements TOptionalMinIOObject {
    @Field({ nullable: true })
    bucket?: string;

    @Field({ nullable: true })
    path?: string;
}
