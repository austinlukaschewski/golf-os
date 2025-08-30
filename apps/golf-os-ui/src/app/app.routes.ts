import { Route } from '@angular/router';

import { authGuard, Login, resolveMe } from '@golf-os/user/ui';

export const appRoutes: Route[] = [
    {
        path: '',
        canActivate: [authGuard],
        resolve: {
            me: resolveMe,
        },
        loadComponent: () => import('./core/layout/layout/layout').then(({ Layout }) => Layout),
    },
    {
        path: 'login',
        component: Login,
    },
];
