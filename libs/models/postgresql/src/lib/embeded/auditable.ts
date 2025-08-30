import type {
    TimestampAuditable as TTimestampAuditable,
    TimestampAuditableWithSoftDelete as TTimestampAuditableWithSoftDelete,
} from '@golf-os/types';

import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimestampAuditable implements TTimestampAuditable {
    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: Date;
}

export abstract class TimestampAuditableWithSoftDelete
    extends TimestampAuditable
    implements TTimestampAuditableWithSoftDelete
{
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;
}
