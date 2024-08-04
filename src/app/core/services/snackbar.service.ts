import { Injectable } from '@angular/core';
import { SnackbarMessage } from '@core/models/Snackbar';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  snackBar$ = new BehaviorSubject<SnackbarMessage | null>(null);
}
