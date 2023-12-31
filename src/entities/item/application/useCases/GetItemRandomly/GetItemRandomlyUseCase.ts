import { Item } from "entities/item/application/domain/Item";
import { ItemRepository } from "../../domain/IItemRepository";
import { IVisitedItemRepository } from "../../../../visitedItem/application/domain/IVisitedItemRepository";
import { GetOrderedItemsUseCase } from "../GetOrderedItems/GetOrderedItemsUseCase";
import { NoMoreItemsError } from "./NoMoreItemsError";
import { getBoundedRandomNumber } from "../../utilities/getBoundedRandomNumber";

export class GetItemRandomlyUseCase {
  constructor(
    private itemRepository: ItemRepository,
    private visitedItemRepository: IVisitedItemRepository
  ) {}

  async execute(): Promise<Item> {
    const getOrderedItems = new GetOrderedItemsUseCase(this.itemRepository);
    const items = await getOrderedItems.execute();

    if (!items.length) return null;
    const visitedItemsLenght = await this.visitedItemRepository.size();
    if (items.length === visitedItemsLenght) throw new NoMoreItemsError();

    let fixedIndex = 0;

    while (items[fixedIndex].isFixed) {
      const exist = await this.visitedItemRepository.exist(
        items[fixedIndex].id
      );
      if (exist) {
        fixedIndex++;
      } else {
        await this.visitedItemRepository.save(items[fixedIndex].id);
        return items[fixedIndex];
      }
    }

    let randomIndex;

    do {
      randomIndex = getBoundedRandomNumber(0, items.length);
    } while (await this.visitedItemRepository.exist(items[randomIndex].id));

    const randomItem = items[randomIndex];
    this.visitedItemRepository.save(randomItem.id);

    return randomItem;
  }
}
