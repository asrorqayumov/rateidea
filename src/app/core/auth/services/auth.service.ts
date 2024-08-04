import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignUpFormValue } from '@core/models/iSignup';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginFormValue } from '@core/models/ILogin';
import { IResponse } from '@core/models/IResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http$ = inject(HttpClient);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  signup(value: SignUpFormValue): Observable<IResponse<string>> {
    const formData = new FormData();
    formData.append('lastName', value.lastName);
    formData.append('firstName', value.firstName);
    formData.append('userName', value.userName);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('confirmPassword', value.confirmPassword);

    return this.http$.post<IResponse<string>>(environment.api + 'auth/sign-up', formData);
  }

  login(value: LoginFormValue): Observable<string> {
    return this.http$.post<string>(environment.api + 'auth/login', JSON.stringify(value), { headers: this.headers });
  }
}
