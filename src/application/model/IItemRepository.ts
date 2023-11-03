import { Item } from "./Item";

export interface ItemRepository {
  save: (item: Item) => void;
  remove: (id: string) => void;
  getAll: () => Item[];
  findBy: (id: string) => Item;
  update: (id: string, newItem: Partial<Item>) => void;
}
