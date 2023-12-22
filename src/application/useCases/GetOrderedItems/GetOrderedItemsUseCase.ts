import { ItemRepository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";
import { GetAllItemsUseCase } from "../GetAllItems/GetAllItemsUseCase";

export class GetOrderedItemsUseCase {
  constructor(private repository: ItemRepository) {}

  execute(): Item[] {
    const getAllItems = new GetAllItemsUseCase(this.repository);
    const items = getAllItems.execute();

    const { fixedItems, noFixedItems } = items.reduce(
      (result, item: Item) => {
        if (item.isFixed) {
          result.fixedItems.push(item);
        } else {
          result.noFixedItems.push(item);
        }
        return result;
      },
      { fixedItems: [], noFixedItems: [] }
    );

    fixedItems.sort((a, b) => a.order - b.order);

    return fixedItems.concat(noFixedItems);
  }
}