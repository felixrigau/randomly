import { ItemRepository } from "../../model/IItemRepository";
import { Item } from "../../model/Item";

export class GetAllItemsUseCase {
  constructor(private repository: ItemRepository) {}

  execute(): Item[] {
    const items = this.repository.getAll();

    const firstFixedItems = items.sort((a, b) => {
      if (a.isFixed > b.isFixed) {
        return -1;
      } else if (a.isFixed < b.isFixed) {
        return 1;
      } else {
        return 0;
      }
    });

    return firstFixedItems;
  }
}
