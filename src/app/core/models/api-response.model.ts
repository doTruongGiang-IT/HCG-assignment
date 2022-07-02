import { Item } from './item.model';

export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Item[];
}
