import { Item } from "../../model/Item";
import { ItemRespository } from "../../model/IItemRepository";

const LOCAL_STORAGE_KEY = "randomly_db";

export class ItemInMemoryRepository implements ItemRespository {
  save = (item: Item) => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (db) {
      const randomlyDB = JSON.parse(db) as { items: Item[] };

      randomlyDB.items.push(item);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(randomlyDB));
    }
  };

  delete = (id: string) => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (db) {
      const randomlyDB = JSON.parse(db);

      randomlyDB.items.filter((item: Item) => item.id !== id);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(randomlyDB));
    }
  };

  getAll = (): Item[] => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (db) {
      const randomlyDB = JSON.parse(db);

      return randomlyDB.items;
    }
  };

  findBy = (id: string): Item => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (db) {
      const randomlyDB = JSON.parse(db);

      return randomlyDB.items.find((item: Item) => item.id === id);
    }
  };

  update = (id: string, updateItem: Partial<Item>): void => {
    const db = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (db) {
      const randomlyDB = JSON.parse(db);

      return randomlyDB.items.map((item: Item) => {
        if (item.id === id) {
          return { ...item, ...updateItem };
        } else {
          return item;
        }
      });
    }
  };
}
