import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponse } from '@core/models/IResponse';
import { ICategory } from '@core/models/ICategory';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  httpClient$ = inject(HttpClient);

  getAllCategories(): Observable<IResponse<ICategory[]>> {
    return this.httpClient$.get<IResponse<ICategory[]>>(environment.api + 'categories/get-all');
  }
}
