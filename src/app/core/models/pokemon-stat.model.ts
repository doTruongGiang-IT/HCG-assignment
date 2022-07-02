import { Item } from './item.model';

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: Item;
}
