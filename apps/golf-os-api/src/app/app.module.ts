import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MulterModule } from '@nestjs/platform-express';

import { GolferModule } from '@golf-os/golfer/nestjs';
import { PostgreSQLTypeOrmModule } from '@golf-os/models/postgresql';
import { UserModule } from '@golf-os/user/nestjs';

import { environmentFactory } from '../environments/environment.development';

import { FileController } from './controllers/file.controller';
import { GraphQLOptionsFactory } from './factories/gql-options.factory';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true, load: [environmentFactory], cache: true }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useClass: GraphQLOptionsFactory,
        }),
        PostgreSQLTypeOrmModule.forRoot(),
        MulterModule.register(),
        UserModule,
        GolferModule,
    ],
    controllers: [FileController],
})
export class AppModule {}
