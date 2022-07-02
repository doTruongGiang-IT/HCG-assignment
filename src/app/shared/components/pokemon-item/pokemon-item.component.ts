import { PokemonInfo } from './../../../core/models/pokemon-info.model';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Pokemon } from './../../../core/models/pokemon.model';
import { BaseWebComponent } from 'src/app/core/base';
import { ApiResponse } from './../../../core/models/api-response.model';
import { Component, Input, OnInit, OnDestroy, OnChanges, Injector } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent extends BaseWebComponent implements OnInit, OnDestroy, OnChanges {
  @Input() pokemonList?: ApiResponse;
  @Input() pokemonSearch?: Pokemon;
  next: string | null = '';
  pokemonNames: string[] = [];
  pokemons: Pokemon[] = [];
  pokemonInfo?: Pokemon;
  isVisible = false;
  isDisable = false;
  subPokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    injector: Injector,
    route: ActivatedRoute,
  ) {
    super(injector, route);
  }

  ngOnChanges(): void {
    if (this.pokemonList?.results) {
      this.next = this.pokemonList.next;
      this.getPokemonName(this.pokemonList);
    }
  }

  ngOnInit(): void {
  }

  initialState() {}

  getPokemonName(value: ApiResponse) {
    this.pokemonNames = [];
    value.results.forEach(pokemon => {
      this.pokemonNames.push(pokemon.name);
    });
    this.getPokemonDetail(this.pokemonNames);
  }

  getPokemonDetail(pokemonNames: string[]) {
    const pokemonNames$ = pokemonNames.map((pokemonName: string) => {
      return this.pokemonService.getPokemon(pokemonName);
    });
    this.isDisable = true;
    this.pokemons = [];

    forkJoin(pokemonNames$)
      .pipe(
        tap((res: PokemonInfo[]) => {
          if (res) {
            res.forEach((item: PokemonInfo) => {
              const pokemonFormat: Pokemon = {
                name: item.name,
                image: item.sprites.front_default,
                heigh: item.height,
                weight: item.weight,
                type: item.types
              };

              this.pokemons.push(pokemonFormat);
            });
          }
        }),
        takeUntil(this.destroyed$),
        finalize(() => this.isDisable = false),
      )
      .subscribe();
  }

  showDetail(pokemon: Pokemon) {
    this.pokemonInfo = pokemon;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
