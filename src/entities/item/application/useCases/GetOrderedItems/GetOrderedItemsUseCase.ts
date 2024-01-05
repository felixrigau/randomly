import { ItemRepository } from "../../domain/IItemRepository";
import { Item } from "../../domain/Item";
import { GetAllItemsUseCase } from "../itemCRUD/GetAllItems/GetAllItemsUseCase";

export class GetOrderedItemsUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(): Promise<Item[]> {
    const getAllItems = new GetAllItemsUseCase(this.repository);
    const items = await getAllItems.execute();

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
