import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import type { LoginRequest, LoginResponse, RefreshTokenResponse, User } from '@golf-os/types';

import { jwtDecode } from 'jwt-decode';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly _http = inject(HttpClient);
    private readonly _router = inject(Router);

    #accessToken = signal<string | undefined>(localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) || undefined);
    #refreshToken = signal<string | undefined>(localStorage.getItem(LocalStorageKey.REFRESH_TOKEN) || undefined);
    user = signal<any | undefined>(undefined);
    user$ = toObservable(this.user);

    login(data: LoginRequest): Observable<boolean> {
        return this._http.post<LoginResponse>('/api/auth/login', data).pipe(
            map((response) => {
                this.accessToken = response.accessToken;
                this.refreshToken = response.refreshToken;

                return this.isTokenValid(this.accessToken);
            }),
            catchError((error) => {
                console.error(`Login failed: ${error}`);
                return of(false);
            }),
        );
    }

    refreshAccessToken(): Observable<string> {
        return this._http
            .get<RefreshTokenResponse>('/api/auth/refresh', {
                headers: { Authorization: `Bearer ${this.#refreshToken()}` },
            })
            .pipe(
                map((response) => {
                    this.accessToken = response.accessToken;

                    return this.accessToken;
                }),
            );
    }

    logout(): void {
        this.accessToken = undefined;
        this.refreshToken = undefined;

        this._router.navigate(['/login']);
    }

    isTokenValid = (token: string) => {
        const { exp } = jwtDecode(token);

        return (exp ?? 0) * 1000 - new Date().getTime() > 5000;
    };

    private handleLocalStorage = (key: LocalStorageKey, value: string | undefined) => {
        if (value) {
            localStorage.setItem(key, value);
        } else {
            localStorage.removeItem(key);
        }
    };

    get accessToken(): string | undefined {
        return this.#accessToken();
    }

    set accessToken(token: string | undefined) {
        this.#accessToken.set(token);
        this.handleLocalStorage(LocalStorageKey.ACCESS_TOKEN, token);
    }

    set refreshToken(token: string | undefined) {
        this.#refreshToken.set(token);
        this.handleLocalStorage(LocalStorageKey.REFRESH_TOKEN, token);
    }
}

enum LocalStorageKey {
    ACCESS_TOKEN = 'golf_os_access_token',
    REFRESH_TOKEN = 'golf_os_refresh_token',
}
