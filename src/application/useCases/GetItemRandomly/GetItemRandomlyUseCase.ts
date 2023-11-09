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

    if (!items.length) return null;
    if (items.length === this.visitedItemRepository.size())
      throw new Error("all items are visited");

    let randomIndex;

    do {
      randomIndex = getBoundedRandomNumber(0, items.length);
    } while (this.visitedItemRepository.exist(items[randomIndex].id));

    const item = items[randomIndex];
    this.visitedItemRepository.save(item.id);

    return item;
  }
}
