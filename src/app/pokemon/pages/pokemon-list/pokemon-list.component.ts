import { Pokemon } from './../../../core/models/pokemon.model';
import { ApiResponse } from './../../../core/models/api-response.model';
import { tap, switchMap, takeUntil, take, catchError } from 'rxjs/operators';
import { BaseWebComponent } from 'src/app/core/base';
import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent extends BaseWebComponent implements OnInit, OnDestroy {
  pokemonList: ApiResponse =  {
    count: 0,
    next: '',
    previous: '',
    results: [],
  };
  itemPerPage = '';
  pokemon?: Pokemon;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    injector: Injector,
    route: ActivatedRoute,
  ) {
    super(injector, route);
  }

  ngOnInit(): void {
    this.route?.queryParams
      .pipe(
        switchMap((res: Params) => {
          if (res.item) {
            this.itemPerPage = res.item;
            // tslint:disable-next-line:radix
            return this.getPokemons(Number.parseInt(this.itemPerPage));
          }
          this.itemPerPage = '10';
          return this.getPokemons();
        })
      )
      .subscribe();
  }

  initialState() {}

  getPokemons(limit?: number) {
    this.limit = limit ? limit : 10;

    return this.pokemonService.getPokemonList(this.queryParams)
      .pipe(
        tap(res => {
          if (res) {
            this.pokemonList = res;
          }
        }),
        takeUntil(this.destroyed$)
      );
  }

  getPokemon(name: string) {
    return this.pokemonService.getPokemon(name)
      .pipe(
        take(1),
        tap((res: any) => {
          if (res) {
            this.pokemon = {
              name: res.name,
              image: res.sprites.front_default,
              heigh: res.height,
              weight: res.weight,
              type: res.types
            };
          }
        }),
        catchError((err: any): any => {
          this.pokemon = undefined;
          return of('');
        }),
        takeUntil(this.destroyed$)
      );
  }

  onChange(e: any) {
    this.itemPerPage = e.target?.value;
    this.router.navigate(['pokemon'], {
        queryParams: { item: this.itemPerPage },
        queryParamsHandling: 'merge'
      }
    );
  }

  search(keyword: string) {
    if (keyword) {
      this.getPokemon(keyword).subscribe();
    } else {
      this.pokemon = undefined;
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
