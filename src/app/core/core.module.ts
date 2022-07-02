import { DestroyService } from './services/destroy.service';
import { InjectionService } from './services/injection.service';
import { PokemonService } from './services/pokemon.service';
import { MenuService } from './services/menu.service';
import { ApiService } from './services/api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTokenInterceptorProvider } from './interceptors/http.token.interceptor';
import { NzMessageService } from 'ng-zorro-antd/message';



@NgModule({
  declarations: [
  ],
  providers: [
    HttpTokenInterceptorProvider,
    ApiService,
    MenuService,
    PokemonService,
    InjectionService,
    DestroyService,
    NzMessageService,
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
