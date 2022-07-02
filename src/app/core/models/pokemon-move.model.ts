import { Item } from './item.model';

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: Item;
    version_group: Item;
}

export interface PokemonMove {
    move: Item;
    version_group_details: Item[];
}
