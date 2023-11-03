import { ItemRepository } from "../../model/IItemRepository";
import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";
import { Item } from "../../model/Item";
import { getBoundedRandomNumber } from "../../utilities/getBoundedRandomNumber";

export class GetItemRandomlyUseCase {
  constructor(
    private itemRepository: ItemRepository,
    private visitedItemRepository: IVisitedItemRepository
  ) {}

  execute(): Item {
    const items = this.itemRepository.getAll();

    if (!items.length) throw new Error("There is no items");

    let randomIndex;

    do {
      randomIndex = getBoundedRandomNumber(0, items.length);
    } while (this.visitedItemRepository.exist(items[randomIndex].id));

    return items[randomIndex];
  }
}
