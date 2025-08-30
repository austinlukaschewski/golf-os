import type { Ghin as TGhin } from '@golf-os/types';

import { Column } from 'typeorm';

export class Ghin implements TGhin {
    static readonly prefix = 'ghin';

    @Column({ name: 'id', nullable: true })
    id?: number;

    @Column({ name: 'club_name', length: 100, nullable: true })
    clubName?: string;

    @Column('decimal', { name: 'handicap_index', precision: 3, scale: 1, nullable: true })
    handicapIndex?: number;
}
