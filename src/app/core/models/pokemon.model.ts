import { Item } from './item.model';

export interface PokemonType {
    slot: number;
    type: Item;
}

export interface Pokemon {
    name: string;
    image: string;
    heigh: number;
    weight: number;
    type: PokemonType[];
}
