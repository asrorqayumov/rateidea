import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IIdea } from '@core/models/IIdea';
import { IResponse } from '@core/models/IResponse';
import { IVote } from '@core/models/IVote';
import { ISavedIdeaResponse } from '@core/models/IIdeaResponse';

@Injectable({ providedIn: 'root' })
export class IdeasService {
  private httpClient$ = inject(HttpClient);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAllIdeas(): Observable<IResponse<IIdea[]>> {
    return this.httpClient$.get<IResponse<IIdea[]>>(environment.api + 'ideas/get-all');
  }

  getIdeas(): Observable<IResponse<IIdea[]>> {
    return this.httpClient$.get<IResponse<IIdea[]>>(environment.api + 'ideas/get');
  }

  vote(data: { isUpvote: boolean; ideaId: number }): Observable<IResponse<IVote>> {
    return this.httpClient$.post<IResponse<IVote>>(
      environment.api + 'idea-votes/toggle-idea-vote',
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }

  saveIdeaRequest(data: { ideaId: number }): Observable<IResponse<ISavedIdeaResponse>> {
    return this.httpClient$.post<IResponse<ISavedIdeaResponse>>(
      environment.api + 'saved-ideas/create',
      JSON.stringify(data),
      {
        headers: this.headers,
      }
    );
  }

  delete(ideaId: number): Observable<IResponse<Boolean>> {
    return this.httpClient$.delete<IResponse<Boolean>>(environment.api + 'ideas/delete/' + ideaId);
  }
}
