import { Item } from './item.model';

export interface Menu {
  count: number;
  next: string | null;
  previous: string | null;
  results: Item[];
}
