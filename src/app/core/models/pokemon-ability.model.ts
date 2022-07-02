import { Item } from './item.model';

export interface PokemonAbility {
    ability: Item;
    is_hidden: boolean;
    slot: number;
}
