import { User as TUser, UserPermission } from '@golf-os/types';

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { defaultEntityOptions } from '../data-source';
import { TimestampAuditable } from '../embeded/auditable';

import { Golfer } from './golfer.entity';
import { UserPassword } from './user-password.entity';

@Entity('users', defaultEntityOptions)
export class User extends TimestampAuditable implements TUser {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'username', length: 50, unique: true, nullable: false })
    username: string;

    @Column({ name: 'email', length: 100, unique: true, nullable: false })
    email: string;

    @Column('timestamp without time zone', { name: 'last_login', nullable: true })
    lastLogin?: Date;

    @Column('enum', { name: 'permissions', array: true, enum: UserPermission, default: [], nullable: false })
    permissions: UserPermission[];

    @OneToOne(() => UserPassword, { cascade: ['insert'], nullable: false, orphanedRowAction: 'delete' })
    @JoinColumn({ name: 'password_id', referencedColumnName: 'id' })
    password: UserPassword;

    @Column('uuid', { name: 'golfer_id', nullable: false })
    golferId: string;

    @OneToOne(() => Golfer, { cascade: ['insert'], nullable: false, orphanedRowAction: 'delete' })
    @JoinColumn({ name: 'golfer_id', referencedColumnName: 'id' })
    golfer: Golfer;
}
