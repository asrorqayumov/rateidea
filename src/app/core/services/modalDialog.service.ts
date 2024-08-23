import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '@core/models/IUser';
import { environment } from '../../../environments/environment';
import { IUserUpdate } from '@core/models/IUserUpdate';
import { IResponse } from '@core/models/IResponse';
import { IIdeaResponse } from '@core/models/IIdeaResponse';

@Injectable({ providedIn: 'root' })
export class ModalDialogService {
  http = inject(HttpClient);

  // modal account
  getUser(id: number): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(environment.api + 'users/get/' + id);
  }

  updateUser(data: IUserUpdate): Observable<IUserUpdate> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    return this.http.put<IUserUpdate>(environment.api + 'users/update-by-id', formData);
  }
  // modal myidea
  createIdea(data: IIdeaResponse): Observable<IResponse<IIdeaResponse>> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    return this.http.post<IResponse<IIdeaResponse>>(environment.api + 'ideas/create', formData);
  }
}
