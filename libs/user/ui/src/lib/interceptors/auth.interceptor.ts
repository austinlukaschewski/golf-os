import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    const service = inject(AuthService);

    const accessToken = service.accessToken;
    if (accessToken && !req.url.includes('/auth/refresh')) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }

    return next(req).pipe(
        catchError((error) => {
            if ((error.status === 401 || error.status === 403) && !req.url.includes('/refresh')) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    refreshTokenSubject.next(null);

                    return service.refreshAccessToken().pipe(
                        // Call your refresh token method
                        switchMap((newToken: string) => {
                            isRefreshing = false;
                            refreshTokenSubject.next(newToken);
                            return next(
                                req.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${newToken}`,
                                    },
                                }),
                            );
                        }),
                        catchError((refreshError) => {
                            isRefreshing = false;
                            service.logout();
                            return throwError(() => refreshError);
                        }),
                    );
                } else {
                    // Queue requests while token is refreshing
                    return refreshTokenSubject.pipe(
                        filter((token) => token !== null),
                        take(1),
                        switchMap((token) => {
                            return next(
                                req.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }),
                            );
                        }),
                    );
                }
            }
            return throwError(() => error);
        }),
    );
};
