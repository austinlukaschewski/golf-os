import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { User } from '@golf-os/types';
import { MeGQL } from '@golf-os/user/data-access';

import { map, Observable, take, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const resolveMe: ResolveFn<Observable<any>> = () => {
    // service.user$ = inject(HttpClient)
    //     .get<Omit<User, 'password' | 'lastLoginAt' | 'createdAt' | 'updatedAt'>>('/api/users/me')
    //     .pipe(take(1));

    const service = inject(AuthService);
    const gql = inject(MeGQL);

    return gql.fetch().pipe(
        map(({ data }) => data.me),
        tap((user) => {
            service.user.set(user);
        }),
        take(1),
    );
};
