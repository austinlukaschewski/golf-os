import type { TimestampAuditable } from './auditable';
import type { Golfer } from './golfer';
import type { UserPassword } from './user-password';
import { UserPermission } from './user-permission';

export type User = {
    id: string;
    username: string;
    email: string;
    lastLogin?: Date;
    permissions: UserPermission[];
    password: UserPassword;
    golfer: Golfer;
    golferId: string;
} & TimestampAuditable;
