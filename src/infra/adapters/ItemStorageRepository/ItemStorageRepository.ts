import { ItemRepository } from "../../../application/model/IItemRepository";
import { Item } from "../../../application/model/Item";
import { LocalStorage } from "../../utilities/localStorage/LocalStorage";
import { DB_STORAGE_KEY } from "../constants";
import { DataBaseSchema } from "../types";

const localStorage = new LocalStorage<DataBaseSchema>(DB_STORAGE_KEY, {
  items: [],
});

export class ItemStorageRepository implements ItemRepository {
  save = (item: Item) => {
    const randomlyDB = localStorage.getLocalStorageData();

    randomlyDB.items.push(item);

    localStorage.updateLocalStorageData(randomlyDB);
  };

  remove = (id: string) => {
    if (!id)
      throw new Error(
        `Error: it was expected a parameter with value, and it got ${id} instead`
      );
    localStorage.updateLocalStorageData({
      items: localStorage
        .getLocalStorageData()
        .items.filter((item: Item) => item.id !== id),
    });
  };

  getAll = (): Item[] => localStorage.getLocalStorageData().items;

  findBy = (id: string): Item | undefined => {
    if (!id)
      throw new Error(
        `Error: it was expected a parameter with value, and it got ${id} instead`
      );

    return localStorage
      .getLocalStorageData()
      .items.find((item: Item) => item.id === id);
  };

  update = (id: string, updateItem: Partial<Item>): void => {
    if (!id)
      throw new Error(
        `Error: it was expected a parameter with value, and it got ${id} instead`
      );

    localStorage.updateLocalStorageData({
      items: localStorage.getLocalStorageData().items.map((item: Item) => {
        if (item.id === id) {
          return { ...item, ...updateItem };
        } else {
          return item;
        }
      }),
    });
  };
}
