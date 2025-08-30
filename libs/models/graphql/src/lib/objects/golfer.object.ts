import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { type Golfer as TGolfer, Handedness } from '@golf-os/types';

import { GraphQLDate } from 'graphql-scalars';

import { TimestampAuditable } from './auditable.object';
import { Ghin } from './ghin.object';
import { OptionalMinIOObject } from './minio.object';

registerEnumType(Handedness, {
    name: 'Handedness',
});

@ObjectType()
export class Golfer extends TimestampAuditable implements TGolfer {
    @Field(() => ID, { nullable: false })
    id: string;

    @Field({ nullable: false })
    firstName: string;

    @Field({ nullable: true })
    middleName?: string;

    @Field({ nullable: false })
    lastName: string;

    @Field({ nullable: true })
    nickname?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    phoneNumber?: string;

    @Field(() => GraphQLDate, { nullable: true })
    birthdate?: Date;

    @Field({ nullable: false })
    stateProvince: string;

    @Field({ nullable: false })
    stateProvinceCode: string;

    @Field({ nullable: false })
    country: string;

    @Field({ nullable: false })
    countryCode: string;

    @Field(() => Handedness, { nullable: false })
    handedness: Handedness;

    @Field(() => Ghin, { nullable: false })
    ghin: Ghin;

    @Field(() => OptionalMinIOObject, { nullable: true })
    avatar: OptionalMinIOObject;
}
