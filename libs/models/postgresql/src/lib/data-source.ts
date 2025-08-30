import { EntityOptions } from 'typeorm';

export const DATA_SOURCE_NAME = 'golf_os';

export const defaultEntityOptions: EntityOptions = {
    database: DATA_SOURCE_NAME,
    schema: 'public',
};
