import { hashSync } from 'bcrypt';
import { ValueTransformer } from 'typeorm';

export const PasswordEncryptionTransformer: ValueTransformer = {
    to: (raw: string) => hashSync(raw, 10),
    from: (encrypted: string) => encrypted,
};
