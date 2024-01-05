import { Item } from "../../entities/item/application/domain/Item";

export type DataBaseSchema = {
  items: Item[];
};

export type VisitedItemIdsType = {
  visitedItemIds: string[];
  lastRequestDate: Date;
};
