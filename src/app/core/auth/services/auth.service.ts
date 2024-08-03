import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignUpFormValue } from '@core/models/iSignup';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http$ = inject(HttpClient);

  signup(value: SignUpFormValue): Observable<string> {
    return this.http$.post<string>(environment.api + 'auth/sign-up', JSON.stringify(value));
  }
}
