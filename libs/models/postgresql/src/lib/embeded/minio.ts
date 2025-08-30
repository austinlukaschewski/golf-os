import type { MinIOObject as TMinIOObject, OptionalMinIOObject as TOptionalMinIOObject } from '@golf-os/types';

import { Column } from 'typeorm';

export class MinIOObject implements TMinIOObject {
    @Column({ name: 'bucket', nullable: false })
    bucket: string;

    @Column({ name: 'path', nullable: false })
    path: string;
}

export class OptionalMinIOObject implements TOptionalMinIOObject {
    @Column({ name: 'bucket', nullable: true })
    bucket?: string;

    @Column({ name: 'path', nullable: true })
    path?: string;
}
