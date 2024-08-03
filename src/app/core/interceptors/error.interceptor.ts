import { HttpRequest, HttpResponse, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SnackBarService } from '@core/services/snackbar.service';
import { catchError, of } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const snackbarService = inject(SnackBarService);

  return next(req).pipe(
    catchError((error: HttpResponse<Error>) => {
      snackbarService.snackBar$.next({ message: error.statusText, cancelText: 'Okay' });
      return of(error);
    })
  );
};
