import { ItemName } from './item-name.model';
import { EffectEntry } from './effect-entry.model';
import { FlavorTextEntry } from './flavor-text-entry.model';
import { GameIndy } from './game-indy.model';
import { Item } from './item.model';

export interface HomeItemResponse {
    attributes: Item[];
    baby_trigger_for: string | null;
    category: Item;
    cost: number;
    effect_entries: EffectEntry[];
    flavor_text_entries: FlavorTextEntry[];
    fling_effect: null;
    fling_power: null;
    game_indices: GameIndy[];
    held_by_pokemon: any[];
    id: number;
    machines: any[];
    name: string;
    names: ItemName[];
    sprites: {
      default: string;
    };
}
