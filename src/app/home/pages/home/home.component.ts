import { ApiResponse } from './../../../core/models/api-response.model';
import { ApiConstants } from './../../../core/constants/api.constant';
import { MenuService } from './../../../core/services/menu.service';
import { PokemonService } from './../../../core/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { BaseWebComponent } from 'src/app/core/base';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseWebComponent implements OnInit, OnDestroy {
  pokemonList: ApiResponse =  {
    count: 0,
    next: '',
    previous: '',
    results: [],
  };

  itemList: ApiResponse =  {
    count: 0,
    next: '',
    previous: '',
    results: [],
  };

  isDisable = false;
  next: string | null = '';
  pokemonNames: string[] = [];

  constructor(
    private pokemonService: PokemonService,
    private menuService: MenuService,
    injector: Injector,
    route: ActivatedRoute,
  ) {
    super(injector, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initialState() {
    this.limit = 10;

    const pokemons = this.pokemonService.getPokemonList(this.queryParams);
    const items = this.menuService.getMenu(ApiConstants.ITEM_PATH, this.queryParams);

    forkJoin([pokemons, items])
      .pipe(
        tap((res: any) => {
          if (res) {
            this.pokemonList = res[0];
            this.next = this.pokemonList.next;
            this.itemList = res[1];
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  showMorePokemon(): void {
    this.isDisable = true;
    this.limit += 10;

    this.pokemonService.getPokemonList(this.queryParams)
      .pipe(
        tap(res => {
          if (res) {
            this.pokemonList = res;
          }
        }),
        takeUntil(this.destroyed$),
        finalize(() => this.isDisable = false)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
