import { ConfigFactory } from '@nestjs/config';

import { defaultsDeep } from 'lodash';

import { environment as defaultEnvironment } from './environment';

export const environmentFactory: ConfigFactory = () =>
    defaultsDeep(
        {
            dataSource: {
                pg: {
                    host: process.env['DATA_SOURCE_PG_HOST'],
                    port: process.env['DATA_SOURCE_PG_PORT'],
                    username: process.env['DATA_SOURCE_PG_USERNAME'],
                    password: process.env['DATA_SOURCE_PG_PASSWORD'],
                    database: process.env['DATA_SOURCE_PG_DATABASE'],
                    schema: process.env['DATA_SOURCE_PG_SCHEMA'],
                    autoLoadEntities: process.env['DATA_SOURCE_PG_AUTO_LOAD_ENTITIES'],
                    synchronize: process.env['DATA_SOURCE_PG_SYNCHRONIZE'],
                    logging: process.env['DATA_SOURCE_PG_LOGGING'],
                },
            },
            minio: {
                endpoint: process.env['MINIO_ENDPOINT'],
                port: parseInt(process.env['MINIO_PORT'] ?? '8300'),
                useSSL: process.env['MINIO_USE_SSL'] === 'true',
                accessKey: process.env['MINIO_ACCESS_KEY'],
                secretKey: process.env['MINIO_SECRET_KEY'],
            },
            jwt: {
                secret: process.env['JWT_SECRET'],
                signOptions: {
                    algorithm: process.env['JWT_ALGORITHM'],
                    expiresIn: process.env['JWT_EXPIRES_IN'],
                    issuer: process.env['JWT_ISSUER'],
                },
                verifyOptions: {
                    algorithm: process.env['JWT_ALGORITHM'],
                    issuer: process.env['JWT_ISSUER'],
                },
                refresh: {
                    signOptions: {
                        expiresIn: process.env['JWT_REFRESH_EXPIRES_IN'],
                    },
                },
            },
        },
        defaultEnvironment
    );
