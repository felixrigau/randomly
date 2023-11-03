import { IVisitedItemRepository } from "../../../application/model/IVisitedItemRepository";
import { getLocalStorageData } from "../../utilities/localStorage/getLocalStorageData";
import { updateLocalStorageData } from "../../utilities/localStorage/updateLocalStorageData";
import { VISITED_ITEMS } from "../constants";
import { VisitedItemIdsType } from "../types";

export class VisitedItemIdStorageRepository implements IVisitedItemRepository {
  exist = (id: string): boolean => {
    const storage = getLocalStorageData<VisitedItemIdsType>(VISITED_ITEMS);
    return storage.visitedItemIds.includes(id);
  };

  save = (id: string) => {
    const storage = getLocalStorageData<VisitedItemIdsType>(VISITED_ITEMS);

    storage.visitedItemIds.push(id);

    updateLocalStorageData<VisitedItemIdsType>(VISITED_ITEMS, storage);
  };

  clear = () => {
    updateLocalStorageData<VisitedItemIdsType>(VISITED_ITEMS, {
      visitedItemIds: [],
    });
  };
}
