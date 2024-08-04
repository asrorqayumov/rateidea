import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignUpFormValue } from '@core/models/iSignup';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginFormValue } from '@core/models/ILogin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http$ = inject(HttpClient);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  signup(value: SignUpFormValue): Observable<string> {
    return this.http$.post<string>(environment.api + 'auth/sign-up', JSON.stringify(value));
  }

  login(value: LoginFormValue): Observable<string> {
    return this.http$.post<string>(environment.api + 'auth/login', JSON.stringify(value), { headers: this.headers });
  }
}
