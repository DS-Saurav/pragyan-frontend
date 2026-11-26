import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  const token = auth.token();
  const isRelativeApi = req.url.startsWith('/api');
  const url = isRelativeApi && environment.apiUrl ? `${environment.apiUrl}${req.url}` : req.url;
  const isApiRequest = isRelativeApi || (environment.apiUrl !== '' && req.url.startsWith(`${environment.apiUrl}/api`));

  const authReq =
    token && isApiRequest
      ? req.clone({
          url,
          setHeaders: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
      : req.clone({
          url,
          setHeaders: {
            Accept: 'application/json',
          },
        });

  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.endsWith('/api/login')) {
        auth.clearSession();
        void router.navigate(['/admin/login']);
      }
      return throwError(() => error);
    }),
  );
};
