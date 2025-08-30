import { TimestampAuditable } from './auditable';

export type UserPassword = {
    id: string;
    hash: string;
    isResetting: boolean;
} & TimestampAuditable;
