import type { CodegenConfig } from '@graphql-codegen/cli';

const defaultPlugins = ['typescript', 'typescript-operations', 'typescript-apollo-angular'];

const config: CodegenConfig = {
    overwrite: true,
    schema: 'apps/golf-os-api/src/schema.gql',
    documents: './libs/user/data-access/src/**/*.gql',
    generates: {
        './libs/user/data-access/src/lib/generated.ts': {
            plugins: defaultPlugins,
        },
    },
};
export default config;
