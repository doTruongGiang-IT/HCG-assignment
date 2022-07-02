import { HomeItemResponse } from './../models/home-item-response.model';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map, tap } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private apiService: ApiService,
    private message: NzMessageService,
  ) { }

  getMenu(path: string, filters?: {}): Observable<ApiResponse> {
    return this.apiService.get(path, new HttpParams({ fromObject: filters }))
      .pipe(
        tap((res: ApiResponse) => {
          return res;
        })
      );
  }

  getDetailMenu(path: string): Observable<HomeItemResponse> {
    return this.apiService.get(path)
      .pipe(
        tap((res: HomeItemResponse) => {
          return res;
        })
      );
  }
}
