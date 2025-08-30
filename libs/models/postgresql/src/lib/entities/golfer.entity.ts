import { type Golfer as TGolfer, Handedness } from '@golf-os/types';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { defaultEntityOptions } from '../data-source';
import { TimestampAuditable } from '../embeded/auditable';
import { Ghin } from '../embeded/ghin';
import { OptionalMinIOObject } from '../embeded/minio';

@Entity('golfers', defaultEntityOptions)
export class Golfer extends TimestampAuditable implements TGolfer {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'first_name', length: 25, nullable: false })
    firstName: string;

    @Column({ name: 'middle_name', length: 25, nullable: true })
    middleName?: string;

    @Column({ name: 'last_name', length: 25, nullable: false })
    lastName: string;

    @Column({ name: 'nickname', length: 25, nullable: true })
    nickname?: string;

    @Column({ name: 'email', length: 50, nullable: true })
    email?: string;

    @Column('date', { name: 'birthdate', nullable: true })
    birthdate?: Date;

    @Column({ name: 'phone_number', length: 10, nullable: true })
    phoneNumber?: string;

    @Column({ name: 'state_province', length: 25, nullable: false })
    stateProvince: string;

    @Column({ name: 'state_province_code', length: 2, nullable: false })
    stateProvinceCode: string;

    @Column({ name: 'country', length: 25, nullable: false })
    country: string;

    @Column({ name: 'country_code', length: 2, nullable: false })
    countryCode: string;

    @Column('enum', { name: 'handedness', enum: Handedness, nullable: false })
    handedness: Handedness;

    @Column(() => Ghin, { prefix: Ghin.prefix })
    ghin: Ghin;

    @Column(() => OptionalMinIOObject, { prefix: 'avatar' })
    avatar: OptionalMinIOObject;
}
