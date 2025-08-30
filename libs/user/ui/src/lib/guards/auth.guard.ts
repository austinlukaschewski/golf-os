import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { catchError, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
    const service = inject(AuthService);
    const token = service.accessToken;

    if (!!token && service.isTokenValid(token)) return true;

    return service.refreshAccessToken().pipe(
        map(() => true),
        catchError(() => {
            service.logout();
            return inject(Router).navigate(['/login']);
        }),
    );
};
