import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IIdea } from '@core/models/IIdea';
import { IResponse } from '@core/models/IResponse';

@Injectable({ providedIn: 'root' })
export class IdeasService {
  httpClient$ = inject(HttpClient);

  getAllIdeas(): Observable<IResponse<IIdea[]>> {
    return this.httpClient$.get<IResponse<IIdea[]>>(environment.api + 'ideas/get-all');
  }
}
