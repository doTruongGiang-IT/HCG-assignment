import { PokemonStat } from './pokemon-stat.model';
import { PokemonMove } from './pokemon-move.model';
import { GameIndy } from './game-indy.model';
import { Item } from './item.model';
import { PokemonAbility } from './pokemon-ability.model';
import { PokemonType } from './pokemon.model';

export interface PokemonStripeOther {
    dream_world: {
        front_default: string;
        front_female: null;
    };
    home: {
        front_default: string;
        front_female: null,
        front_shiny: string;
        front_shiny_female: null
    };
    'official-artwork': {
        front_default: string;
    };
}

export interface PokemonInfo {
    abilities: PokemonAbility[];
    base_experience: number;
    forms: Item[];
    game_indices: GameIndy[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: PokemonMove[];
    name: string;
    order: number;
    past_types: any[];
    species: Item;
    sprites: {
        back_default: string;
        back_female: null;
        back_shiny: string;
        back_shiny_female: null;
        front_default: string;
        front_female: null;
        front_shiny: string;
        front_shiny_female: null;
        other: PokemonStripeOther;
        versions: any;
    };
    stats: PokemonStat[];
    types: PokemonType[];
    weight: number;
}
