import { IVisitedItemRepository } from "../../../application/model/IVisitedItemRepository";
import { LocalStorage } from "../../utilities/localStorage/LocalStorage";
import { VISITED_ITEMS } from "../constants";
import { VisitedItemIdsType } from "../types";

const localStorage = new LocalStorage<VisitedItemIdsType>(VISITED_ITEMS, {
  visitedItemIds: [],
});

export class VisitedItemIdStorageRepository implements IVisitedItemRepository {
  exist = (id: string): boolean => {
    const storage = localStorage.getLocalStorageData();
    return storage.visitedItemIds.includes(id);
  };

  size = (): number => localStorage.getLocalStorageData().visitedItemIds.length;

  save = (id: string) => {
    const storage = localStorage.getLocalStorageData();

    storage.visitedItemIds.push(id);

    localStorage.updateLocalStorageData(storage);
  };

  clear = () => {
    localStorage.updateLocalStorageData({
      visitedItemIds: [],
    });
  };
}
