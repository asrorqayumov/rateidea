import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponse } from '@core/models/IResponse';
import { ISavedIdea } from '@core/models/ISavedIdea';

@Injectable({ providedIn: 'root' })
export class SavedIdeaService {
  httpClient = inject(HttpClient);

  getAllSavedIdeas(size: number, index: number): Observable<IResponse<ISavedIdea[]>> {
    const params = new HttpParams().set('size', size.toString()).set('index', index.toString());

    return this.httpClient.get<IResponse<ISavedIdea[]>>(environment.api + 'saved-ideas/get-all', { params });
  }
}
