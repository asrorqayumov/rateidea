import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { IIdea } from '@core/models/IIdea';
import { IResponse } from '@core/models/IResponse';
import { IVote } from '@core/models/IVote';

interface Idea {
  title: string;
  description: string;
  categoryId: number;
}

@Injectable({ providedIn: 'root' })
export class IdeasService {
  private httpClient$ = inject(HttpClient);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getAllIdeas(): Observable<IResponse<IIdea[]>> {
    return this.httpClient$.get<IResponse<IIdea[]>>(environment.api + 'ideas/get-all-full');
  }

  addIdeas(body: any) {
    const json = localStorage.getItem('user');
    const user = JSON.parse(json!);
    const header = new HttpHeaders({
      Authorization: 'Bearer ' + user.token,
    });
    const data = body as Idea;

    const formData = Object.entries(data).reduce((fd, [key, val]) => {
      fd.append(key, val);
      return fd;
    }, new FormData());
    console.log(body);

    return this.httpClient$.post(environment.api + 'ideas/create', formData, { headers: header });
  }

  editIdeas(body: any) {
    const data = body as Idea;

    const formData = Object.entries(data).reduce((fd, [key, val]) => {
      fd.append(key, val);
      return fd;
    }, new FormData());

    return this.httpClient$.put(environment.api + 'ideas/update', formData);
  }

  getIdeas(): Observable<IResponse<IIdea[]>> {
    return this.httpClient$.get<IResponse<IIdea[]>>(environment.api + 'ideas/get');
  }

  getSavedIdeas(): Observable<any> {
    return this.httpClient$
      .get<IResponse<{ idea: IIdea[] }[]>>(environment.api + 'saved-ideas/get-all')
      .pipe(map((res) => res.data.map((idea) => ({ ...idea.idea }))));
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

  saveIdea(data: { ideaId: number; isSaved: boolean }): Observable<IResponse<IVote>> {
    return this.httpClient$.post<IResponse<IVote>>(
      environment.api + 'saved-ideas/toggle-saved-idea',
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
