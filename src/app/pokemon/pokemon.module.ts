import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { SharedModule } from '../shared';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  declarations: [
    SearchComponent,
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzPaginationModule,
  ]
})
export class PokemonModule { }
