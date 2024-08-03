import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignUpFormValue } from '@core/models/iSignup';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IResponse } from '@core/models/IResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http$ = inject(HttpClient);

  signup(value: SignUpFormValue): Observable<IResponse<string>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('lastName', value.lastName)
      .set('firstName', value.firstName)
      .set('userName', value.userName)
      .set('email', value.email)
      .set('email', value.dateOfBirth.toString())
      .set('password', value.password)
      .set('confirmPassword', value.confirmPassword);

    return this.http$.post<IResponse<string>>(environment.api + 'auth/sign-up', body.toString(), { headers });
  }
}
