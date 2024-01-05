import { Item } from "./Item";

export interface ItemRepository {
  save: (item: Item) => Promise<void>;
  remove: (id: string) => Promise<void>;
  getAll: () => Promise<Item[]>;
  findBy: (id: string) => Promise<Item | void>;
  update: (id: string, newItem: Partial<Item>) => Promise<void>;
}
