import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (authService.verify()) {
    return true;
  } else {
    if (isPlatformBrowser(platformId)) {
      return router.createUrlTree(['/login']);
    } else {
      return false;
    }
  }
};

export const NoAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.verify()) {
    return router.createUrlTree(['/home']);
  } else {
    return true;
  }
};
