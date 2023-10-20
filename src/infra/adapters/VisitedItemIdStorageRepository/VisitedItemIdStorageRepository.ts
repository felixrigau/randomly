import { IVisitedItemRespository } from "../../../application/model/IVisitedItemRespository";
import { getLocalStorageData } from "../../utilities/localStorage/getLocalStorageData";
import { updateLocalStorageData } from "../../utilities/localStorage/updateLocalStorageData";
import { VISITED_ITEMS } from "../constants";
import { VisitedItemIdsType } from "../types";

export class VisitedItemIdStorageRepository implements IVisitedItemRespository {
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
