import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const user = authService.getUser();

  if (user && user.token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return next(authReq);
  }

  return next(req);
};
