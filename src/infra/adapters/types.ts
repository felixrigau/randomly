import { Item } from "../../application/model/Item";

export type DataBaseSchema = {
  items: Item[];
};

export type VisitedItemIdsType = { visitedItemIds: string[] };
