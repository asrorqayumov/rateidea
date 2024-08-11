import { HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SnackbarType } from '@core/models/Snackbar';
import { SnackBarService } from '@core/services/snackbar.service';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const snackbarService = inject(SnackBarService);

  return next(req).pipe(
    catchError((error: any) => {
      console.log(error);

      snackbarService.snackBar$.next({ message: error.statusText, cancelText: 'Okay', type: SnackbarType.ERROR });
      return throwError(() => error);
    })
  );
};
