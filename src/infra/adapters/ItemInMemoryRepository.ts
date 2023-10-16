import { Item } from "../../model/Item";
import { ItemRespository } from "../../model/IItemRepository";
import { LOCAL_STORAGE_KEY } from "./constants";
import { DataBaseSchema } from "./types";

const getLocalData = (): DataBaseSchema => {
  const db = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (db) {
    return JSON.parse(db);
  } else {
    const initialDB: DataBaseSchema = { items: [] };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialDB));

    return initialDB;
  }
};

const updateLocalData = (newData: Partial<DataBaseSchema>) => {
  const db = getLocalData();

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ ...db, ...newData })
  );
};

export class ItemInMemoryRepository implements ItemRespository {
  save = (item: Item) => {
    const randomlyDB = getLocalData();

    randomlyDB.items.push(item);

    updateLocalData(randomlyDB);
  };

  remove = (id: string) => {
    updateLocalData({
      items: getLocalData().items.filter((item: Item) => item.id !== id),
    });
  };

  getAll = (): Item[] => getLocalData().items;

  findBy = (id: string): Item =>
    getLocalData().items.find((item: Item) => item.id === id);

  update = (id: string, updateItem: Partial<Item>): void => {
    updateLocalData({
      items: getLocalData().items.map((item: Item) => {
        if (item.id === id) {
          return { ...item, ...updateItem };
        } else {
          return item;
        }
      }),
    });
  };
}
