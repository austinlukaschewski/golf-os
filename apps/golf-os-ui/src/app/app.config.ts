import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    ApplicationConfig,
    inject,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { authInterceptor } from '@golf-os/user/ui';

import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { appRoutes } from './app.routes';

import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideApollo(() => {
            const httpLink = inject(HttpLink);

            const basic = setContext((operation, context) => ({
                headers: {
                    Accept: 'charset=utf-8',
                    'Access-Control-Allow-Credentials': true,
                },
            }));

            const auth = setContext((operation, context) => {
                const token = localStorage.getItem('golf_os_access_token');

                if (token === null) {
                    return {};
                } else {
                    return {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                }
            });

            return {
                link: ApolloLink.from([
                    basic,
                    auth,
                    httpLink.create({ uri: 'http://localhost:9000/graphql', withCredentials: true }),
                ]),
                cache: new InMemoryCache({ addTypename: false }),
                credentials: 'include',
            };
        }),
    ],
};
