import { TimestampAuditable } from './auditable';
import type { Ghin } from './ghin';
import { Handedness } from './handedness';
import { OptionalMinIOObject } from './minio';

export type Golfer = {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    nickname?: string;
    email?: string;
    phoneNumber?: string;
    birthdate?: Date;
    stateProvince: string;
    stateProvinceCode: string;
    country: string;
    countryCode: string;
    handedness: Handedness;
    ghin: Ghin;
    avatar: OptionalMinIOObject;
} & TimestampAuditable;
