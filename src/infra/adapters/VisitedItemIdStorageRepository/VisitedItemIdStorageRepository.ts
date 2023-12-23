import { IVisitedItemRepository } from "../../../application/model/IVisitedItemRepository";
import { LocalStorage } from "../../utilities/localStorage/LocalStorage";
import { VISITED_ITEMS } from "../constants";
import { VisitedItemIdsType } from "../types";

const localStorage = new LocalStorage<VisitedItemIdsType>(VISITED_ITEMS, {
  visitedItemIds: [],
  lastRequestDate: new Date(),
});

export class VisitedItemIdStorageRepository implements IVisitedItemRepository {
  exist = async (id: string) => {
    const storage = localStorage.getLocalStorageData();
    return storage.visitedItemIds.includes(id);
  };

  size = async () => localStorage.getLocalStorageData().visitedItemIds.length;

  save = async (id: string) => {
    const storage = localStorage.getLocalStorageData();

    storage.visitedItemIds.push(id);

    localStorage.updateLocalStorageData(storage);
  };

  remove = async (id: string) => {
    const storage = localStorage.getLocalStorageData();

    const listWhitoutItem = storage.visitedItemIds.filter(
      (itemId) => itemId != id
    );

    localStorage.updateLocalStorageData({
      ...storage,
      visitedItemIds: listWhitoutItem,
    });
  };

  clear = async () => {
    const storage = localStorage.getLocalStorageData();

    localStorage.updateLocalStorageData({ ...storage, visitedItemIds: [] });
  };

  getLastRequestDate = async () => {
    return new Date(localStorage.getLocalStorageData().lastRequestDate);
  };

  saveLastRequestDate = async (currentDate: Date) => {
    const storage = localStorage.getLocalStorageData();

    localStorage.updateLocalStorageData({
      ...storage,
      lastRequestDate: currentDate,
    });
  };
}
