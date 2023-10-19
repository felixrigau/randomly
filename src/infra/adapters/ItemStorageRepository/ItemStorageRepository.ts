import { ItemRespository } from "../../../application/model/IItemRepository";
import { Item } from "../../../application/model/Item";
import { LOCAL_STORAGE_KEY } from "../constants";
import { DataBaseSchema } from "../types";

const getLocalStorageData = (): DataBaseSchema => {
  const db = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (db) {
    return JSON.parse(db);
  } else {
    const initialDB: DataBaseSchema = { items: [] };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialDB));

    return initialDB;
  }
};

const updateLocalStorageData = (newData: Partial<DataBaseSchema>) => {
  const db = getLocalStorageData();

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ ...db, ...newData })
  );
};

export class ItemStorageRepository implements ItemRespository {
  save = (item: Item) => {
    const randomlyDB = getLocalStorageData();

    randomlyDB.items.push(item);

    updateLocalStorageData(randomlyDB);
  };

  remove = (id: string) => {
    if (!id)
      throw new Error(
        `Error: it was expected a parameter with value, and it got ${id} instead`
      );
    updateLocalStorageData({
      items: getLocalStorageData().items.filter((item: Item) => item.id !== id),
    });
  };

  getAll = (): Item[] => getLocalStorageData().items;

  findBy = (id: string): Item | undefined => {
    if (!id)
      throw new Error(
        `Error: it was expected a parameter with value, and it got ${id} instead`
      );

    return getLocalStorageData().items.find((item: Item) => item.id === id);
  };

  update = (id: string, updateItem: Partial<Item>): void => {
    if (!id)
      throw new Error(
        `Error: it was expected a parameter with value, and it got ${id} instead`
      );

    updateLocalStorageData({
      items: getLocalStorageData().items.map((item: Item) => {
        if (item.id === id) {
          return { ...item, ...updateItem };
        } else {
          return item;
        }
      }),
    });
  };
}
