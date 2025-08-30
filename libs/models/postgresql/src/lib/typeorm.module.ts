import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { DATA_SOURCE_NAME } from './data-source';
import { PostgresqlOptionsFactory } from './factories/postgresql-options.factory';

@Module({})
export class PostgreSQLTypeOrmModule {
    static forRoot = (): DynamicModule => ({
        module: PostgreSQLTypeOrmModule,
        imports: [
            TypeOrmModule.forRootAsync({
                name: DATA_SOURCE_NAME,
                useClass: PostgresqlOptionsFactory,
                inject: [ConfigService],
            }),
        ],
    });

    static forFeature = (entities: EntityClassOrSchema[]): DynamicModule => ({
        module: PostgreSQLTypeOrmModule,
        imports: [TypeOrmModule.forFeature(entities, DATA_SOURCE_NAME)],
    });
}
