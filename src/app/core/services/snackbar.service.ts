import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SnackbarMessage {
  message: string;
  cancelText?: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  snackBar$ = new BehaviorSubject<SnackbarMessage | null>(null);
}
