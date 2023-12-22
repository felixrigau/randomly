import { ItemRepository } from "../../model/IItemRepository";
import { IVisitedItemRepository } from "../../model/IVisitedItemRepository";
import { Item } from "../../model/Item";
import { getBoundedRandomNumber } from "../../utilities/getBoundedRandomNumber";
import { GetOrderedItemsUseCase } from "../GetOrderedItems/GetOrderedItemsUseCase";
import { NoMoreItemsError } from "./NoMoreItemsError";

export class GetItemRandomlyUseCase {
  constructor(
    private itemRepository: ItemRepository,
    private visitedItemRepository: IVisitedItemRepository
  ) {}

  execute(): Item {
    const getOrderedItems = new GetOrderedItemsUseCase(this.itemRepository);
    const items = getOrderedItems.execute();

    if (!items.length) return null;
    if (items.length === this.visitedItemRepository.size())
      throw new NoMoreItemsError();

    let fixedIndex = 0;

    while (items[fixedIndex].isFixed) {
      if (this.visitedItemRepository.exist(items[fixedIndex].id)) {
        fixedIndex++;
      } else {
        this.visitedItemRepository.save(items[fixedIndex].id);
        return items[fixedIndex];
      }
    }

    let randomIndex;

    do {
      randomIndex = getBoundedRandomNumber(0, items.length);
    } while (this.visitedItemRepository.exist(items[randomIndex].id));

    const randomItem = items[randomIndex];
    this.visitedItemRepository.save(randomItem.id);

    return randomItem;
  }
}
