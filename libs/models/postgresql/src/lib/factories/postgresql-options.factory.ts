import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { defaults, isEmpty } from 'lodash';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { SnakeNamingStrategy } from '../naming-strategies/snake';

@Injectable()
export class PostgresqlOptionsFactory implements TypeOrmOptionsFactory {
    constructor(@Inject(ConfigService) private readonly config: ConfigService) {}

    createTypeOrmOptions(name?: string): TypeOrmModuleOptions {
        // const propertyPath = isEmpty(name) ? 'db.postgresql' : `db.postgresql.${name}`;
        // Note: Since we will only ever use 1 pg database instance, we will simplify the property path.
        const propertyPath = 'dataSource.pg';
        const options = this.config.get<Partial<PostgresConnectionOptions>>(propertyPath);
        if (isEmpty(options)) throw new Error(`TypeOrm options for "${propertyPath}" are not defined.`);

        return defaults({ type: 'postgres', name, namingStrategy: new SnakeNamingStrategy() }, options);
    }
}
