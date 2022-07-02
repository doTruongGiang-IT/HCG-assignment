import { PokemonInfo } from './../models/pokemon-info.model';
import { ApiConstants } from './../constants/api.constant';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private apiService: ApiService,
    private message: NzMessageService,
  ) { }

  getPokemonList(filters: {}): Observable<ApiResponse> {
    return this.apiService.get(ApiConstants.POKEMON_PATH, new HttpParams({ fromObject: filters }))
      .pipe(
        tap((res: ApiResponse) => {
          return res;
        })
      );
  }

  getPokemon(name: string): Observable<PokemonInfo> {
    return this.apiService.get(`${ApiConstants.POKEMON_PATH}${name}/`)
      .pipe(
        tap((res: PokemonInfo) => {
          return res;
        })
      );
  }
}
