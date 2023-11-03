import { ItemRepository } from "../../../application/model/IItemRepository";
import { Item } from "../../../application/model/Item";
import { getLocalStorageData } from "../../utilities/localStorage/getLocalStorageData";
import { updateLocalStorageData } from "../../utilities/localStorage/updateLocalStorageData";
import { DB_STORAGE_KEY } from "../constants";
import { DataBaseSchema } from "../types";

export class ItemStorageRepository implements ItemRepository {
  save = (item: Item) => {
    const randomlyDB = getLocalStorageData<DataBaseSchema>(DB_STORAGE_KEY);

    randomlyDB.items.push(item);

    updateLocalStorageData<DataBaseSchema>(DB_STORAGE_KEY, randomlyDB);
  };

  remove = (id: string) => {
    if (!id)
      throw new Error(
        `Error: it was expected a parameter with value, and it got ${id} instead`
      );
    updateLocalStorageData<DataBaseSchema>(DB_STORAGE_KEY, {
      items: getLocalStorageData<DataBaseSchema>(DB_STORAGE_KEY).items.filter(
        (item: Item) => item.id !== id
      ),
    });
  };

  getAll = (): Item[] =>
    getLocalStorageData<DataBaseSchema>(DB_STORAGE_KEY).items;

  findBy = (id: string): Item | undefined => {
    if (!id)
      throw new Error(
        `Error: it was expected a parameter with value, and it got ${id} instead`
      );

    return getLocalStorageData<DataBaseSchema>(DB_STORAGE_KEY).items.find(
      (item: Item) => item.id === id
    );
  };

  update = (id: string, updateItem: Partial<Item>): void => {
    if (!id)
      throw new Error(
        `Error: it was expected a parameter with value, and it got ${id} instead`
      );

    updateLocalStorageData<DataBaseSchema>(DB_STORAGE_KEY, {
      items: getLocalStorageData<DataBaseSchema>(DB_STORAGE_KEY).items.map(
        (item: Item) => {
          if (item.id === id) {
            return { ...item, ...updateItem };
          } else {
            return item;
          }
        }
      ),
    });
  };
}
