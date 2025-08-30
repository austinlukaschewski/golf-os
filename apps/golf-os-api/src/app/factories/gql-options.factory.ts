import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';

import { join } from 'path';

@Injectable()
export class GraphQLOptionsFactory implements GqlOptionsFactory<ApolloDriverConfig> {
    createGqlOptions = (): Omit<ApolloDriverConfig, 'driver'> | Promise<Omit<ApolloDriverConfig, 'driver'>> => ({
        autoSchemaFile: join(process.cwd(), 'apps/golf-os-api/src/schema.gql'),
        sortSchema: true,
        resolverValidationOptions: {
            requireResolversForResolveType: 'ignore',
        },
        path: '/graphql',
        debug: true,
        formatError: (error) => ({
            message: error.message,
            code: error.extensions && error.extensions['code'],
            locations: error.locations,
            path: error.path,
        }),
        persistedQueries: {},
        installSubscriptionHandlers: true,
    });
}
