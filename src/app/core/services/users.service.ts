import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponse } from '@core/models/IResponse';
import { IUser } from '@core/models/IUser';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http$ = inject(HttpClient);

  getUser(): Observable<IResponse<IUser>> {
    return this.http$.get<IResponse<IUser>>(environment.api + 'users/get');
  }

  updateUser(formGroup: FormGroup): Observable<IResponse<IUser>> {
    const formData = new FormData();

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);

      if (control && control.value !== null && control.value !== undefined) {
        formData.append(key, control.value);
      }
    });

    return this.http$.put<IResponse<IUser>>(environment.api + 'users/update', formData);
  }
}
