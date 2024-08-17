import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SignUpFormValue } from '@core/models/iSignup';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginFormValue } from '@core/models/ILogin';
import { IResponse } from '@core/models/IResponse';
import { IUser } from '@core/models/IUserResponse';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http$ = inject(HttpClient);
  router = inject(Router);

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private user$ = new BehaviorSubject<IUser | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setUser(user: IUser): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
      this.user$.next(user);
    }
  }

  getUser$(): Observable<IUser | null> {
    return this.user$.asObservable();
  }

  getUser(): IUser | null {
    let storedUser: IUser | null = null;
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');

      if (user) {
        storedUser = JSON.parse(user);
      }
    }
    return this.user$.value || storedUser;
  }

  init(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.setUser(JSON.parse(storedUser));
      }
    }
  }

  signup(value: SignUpFormValue): Observable<IResponse<string>> {
    const formData = Object.entries(value).reduce((fd, [key, val]) => {
      fd.append(key, val);
      return fd;
    }, new FormData());

    return this.http$.post<IResponse<string>>(environment.api + 'auth/sign-up', formData);
  }

  login(value: LoginFormValue): Observable<IResponse<IUser>> {
    return this.http$
      .post<IResponse<IUser>>(environment.api + 'auth/login', JSON.stringify(value), { headers: this.headers })
      .pipe(
        tap((res) => {
          this.setUser(res.data);
        })
      );
  }

  verifyEmail(value: { email: string; verificationCode: string }): Observable<IResponse<IUser>> {
    return this.http$.post<IResponse<IUser>>(environment.api + 'auth/verify-email', value).pipe(
      tap((res) => {
        this.setUser(res.data);
      })
    );
  }

  verify(): boolean {
    const user = this.getUser();
    if (!user) return false;

    if (this.parseJwt(user.token).exp * 1000 < new Date().getTime()) {
      this.logout();
    }

    return true;
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    }
  }
}