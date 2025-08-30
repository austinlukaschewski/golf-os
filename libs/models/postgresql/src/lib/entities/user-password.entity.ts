import type { UserPassword as TUserPassword } from '@golf-os/types';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { defaultEntityOptions } from '../data-source';
import { TimestampAuditable } from '../embeded/auditable';
import { PasswordEncryptionTransformer } from '../transformers/password-encryption';

@Entity('user_passwords', defaultEntityOptions)
export class UserPassword extends TimestampAuditable implements TUserPassword {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'hash', transformer: PasswordEncryptionTransformer, nullable: false })
    hash: string;

    @Column({ name: 'is_resetting', default: false, nullable: false })
    isResetting: boolean;
}
